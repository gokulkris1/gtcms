import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import Button from "components/button/Button";
import Pagination from "components/common/Pagination";
import "react-table/react-table.css";
import { withRouter } from "react-router";

import profileImg from "assets/images/user.png";
import Api from "api/Api";
import CommonModal from "components/common/CommonModal";
import UserModal from "./UserModal";
import Loader from "components/common/Loader";
import Toaster from "components/common/Toaster";
import GivePointsModal from "./GivePointsModal";
import fileDownload from "js-file-download";
import moment from "moment";
let debounceTimer;

const UserTable = ({ isStore = false, ...props }) => {
  const { history, storeId } = props;

  const [tblData, settblData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("DESC");
  const [field, setField] = useState("createdAt");
  const [viewModal, setviewModal] = useState(false);
  const [pointsModal, setPointsModal] = useState(false);
  const [viewData, setviewData] = useState(null);
  const [pointsModalData, setPointsModalData] = useState(null);
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const [isDeletePoint, setIsDeletePoint] = useState(false);
  const toaster = useRef();

  const columns = [
    {
      Header: "Image",
      accessor: "profileImage",
      className: "text-center",
      sortable: false,
      filterable: false,
      headerClassName: "react-table-header-class",
      width: 142,
      Cell: props => (
        <div>
          <img
            src={
              props.original.profileImage
                ? props.original.profileImage
                : profileImg
            }
            alt="error"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>
      )
    },
    {
      Header: "First name",
      accessor: "firstName",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Last name",
      accessor: "lastName",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Email",
      accessor: "email",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
      className: "text-center",
      filterable: false,
      sortable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Country",
      accessor: "country",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Register Type",
      accessor: "registerType",
      className: "text-center",
      filterable: false,
      sortable: false,
      headerClassName: "react-table-header-class",
      width: 150
    },
    {
      Header: "Total Points",
      accessor: "userTotalPoint",
      className: "text-center",
      filterable: false,
      sortable: false,
      headerClassName: "react-table-header-class",
      width: 100
    },
    {
      Header: "Receipts",
      accessor: "receiptCount",
      className: "text-center",
      headerClassName: "react-table-header-class",
      sortable: false,
      filterable: false,
      width: 80,
      Cell: props => (
        <div className="react-action-class">
          <Button
            className="c-btn c-info  mr-10"
            onClick={() => {
              const url = !isStore
                ? `/user/receipt/${props.original.userId}`
                : `/store/user/receipt/${props.original.userId}`;
              history.push(url);
            }}
            disabled={props.original.receiptCount === 0}
          >
            <div className="fs-14 medium-text">
              <i className="fas fa-receipt mr-6" />{" "}
              {props.original.receiptCount}
            </div>
          </Button>
        </div>
      ) // Custom cell components!
    },
    {
      Header: "Status",
      accessor: "status",
      className: "text-center",
      headerClassName: "react-table-header-class",
      sortable: false,
      filterable: false,
      width: 180,
      Cell: props => (
        <div className="react-action-class">
          {props.original.active ? (
            <div id={`active-${props.original.userId}`}>
              <button
                style={{ minWidth: "96px" }}
                className="c-btn c-info mr-10"
                disabled
              >
                <div className="fs-14 medium-text">Active</div>
              </button>
            </div>
          ) : (
            <div id={`deactive-${props.original.userId}`}>
              <Button
                style={{ minWidth: "96px" }}
                className="c-btn c-warning mr-10"
                disabled
              >
                <div className="fs-14 medium-text">InActive</div>
              </Button>
            </div>
          )}
        </div>
      ) // Custom cell components!
    },
    {
      Header: "Action",
      accessor: "action",
      className: "text-center",
      headerClassName: "react-table-header-class",
      sortable: false,
      filterable: false,
      width: 400,
      Cell: props => (
        <div className="react-action-class">
          <Button
            className="c-btn c-info  mr-10"
            onClick={() => viewHandler(props.original)}
          >
            <div className="fs-14 medium-text">
              <i className="fas fa-info mr-6" /> View
            </div>
          </Button>
          <Button
            className="c-btn c-info  mr-10"
            onClick={() => {
              setPointsModalData(props.original);
              setPointsModal(true);
            }}
          >
            <div className="fs-14 medium-text">
              <i className="fas fa-coins mr-6" /> Give Points
            </div>
          </Button>
          <Button
            className="c-btn c-danger  mr-10"
            onClick={() => {
              setIsDeletePoint(true);
              setPointsModalData(props.original);
              setPointsModal(true);
            }}
            disabled={!props?.original?.userTotalPoint}
          >
            <div className="fs-14 medium-text">
              <i className="fas fa-coins mr-6" /> Remove Points
            </div>
          </Button>
        </div>
      ) // Custom cell components!
    }
  ];

  useEffect(() => {
    if (searchText !== null) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    }
  }, [searchText]);

  useEffect(() => {
    const params = {
      page: {
        limit: 10,
        pageId: 1
      },
      sortBy: {
        direction: "DESC",
        property: "createdAt"
      },
      search: ""
    };
    callListApi(params);
    setPages(10);
  }, []);

  const callListApi = params => {
    setLoader(true);
    const url = !isStore
      ? "/admin/user/list"
      : `/admin/user/list?storeId=${storeId}`;
    Api.post(url, params)
      .then(res => {
        settblData(res.data.data.list);
        setLoader(false);
        setPages(Math.ceil(res.data.data.totalRecords / 10));
      })
      .catch(err => {
        if (toaster.current) toaster.current.error(err.message);
        setLoader(false);
      });
  };

  const viewHandler = data => {
    setviewData(data);
    setviewModal(true);
  };

  const downloadCSV = async () => {
    setIsCsvLoading(true);
    const response = await Api.get("/admin/exportCSV/userList");
    const fileName = `users-${moment().format("MM-DD-YYYY")}.csv`;

    if (response) {
      fileDownload(response.data, fileName);
    }
    if (response.status === 200) {
      toaster.current.success("CSV file downloaded");
    }
    setIsCsvLoading(false);
  };

  return (
    <div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> Users List
            </div>
            <div className="mr-10">
              <input
                value={searchText}
                onChange={e => {
                  setLoader(true);
                  setActivePage(0);
                  callListApi({
                    page: {
                      limit: 10,
                      pageId: activePage + 1
                    },
                    search: e.target.value,
                    sortBy: {
                      direction: sortBy,
                      property: field
                    }
                  });
                  setSearchText(e.target.value);
                }}
                type="text"
                placeholder="Search..."
                className="fs-14 medium-text plr-10 form-control react-form-input"
              />
            </div>
            <div>
              <Button
                className="c-btn ma-5"
                onClick={() => setPointsModal(true)}
                style={{
                  backgroundColor: "#4CBB17",
                  color: "#fff"
                }}
              >
                <i className="fas fa-coins mr-10"></i>Give Points
              </Button>
              {!isStore && (
                <Button
                  className="c-btn ma-5"
                  onClick={downloadCSV}
                  style={{
                    backgroundColor: "#4CBB17",
                    color: "#fff"
                  }}
                  disabled={isCsvLoading}
                >
                  {!isCsvLoading ? (
                    <i class="fas fa-file-csv"></i>
                  ) : (
                    <i class="fas fa-ellipsis-h"></i>
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="roe-card-body">
            <ReactTable
              style={{
                border: "none",
                boxShadow: "none"
              }}
              // ref={tableRef}
              data={tblData}
              columns={columns}
              defaultPageSize={10}
              filterable
              minRows={2}
              manual
              defaultFilterMethod={(filter, row) => {
                const id = filter.pivotId || filter.id;

                return row[id] !== undefined
                  ? String(row[id].toLowerCase()).includes(
                      filter.value.toLowerCase()
                    )
                  : true;
              }}
              getTdProps={(state, rowInfo, column) => ({
                style: {
                  height: "60px"
                }
              })}
              className="-striped -highlight custom-react-table-theme-class"
              pages={pages}
              page={activePage}
              PaginationComponent={Pagination}
              loading={loader}
              LoadingComponent={Loader}
              onPageChange={pageIndex => {
                setActivePage(pageIndex);
                callListApi({
                  page: {
                    limit: 10,
                    pageId: pageIndex + 1
                  },
                  search: searchText,
                  sortBy: {
                    direction: sortBy,
                    property: field
                  }
                });
              }}
              onSortedChange={sortProperties => {
                const sort = sortProperties[0].desc ? "DESC" : "ASC";
                setSortBy(sort);
                setActivePage(0);
                setField(sortProperties[0].id);
                callListApi({
                  page: {
                    limit: 10,
                    pageId: activePage + 1
                  },
                  search: searchText,
                  sortBy: {
                    direction: sort,
                    property: sortProperties[0].id
                  }
                });
              }}
            />
          </div>
          <Toaster ref={toaster} />
          <CommonModal
            size="lg"
            modal={viewModal}
            toggle={() => {
              setviewModal(!viewModal);
            }}
            viewModalCheck={true}
            headerData={"User Details"}
            children={<UserModal data={viewData} />}
          />
          <CommonModal
            size="lg"
            modal={pointsModal}
            toggle={() => {
              setPointsModal(!pointsModal);
              setPointsModalData(null);
            }}
            viewModalCheck={true}
            headerData={
              isDeletePoint
                ? `Delete Points for ${pointsModalData?.firstName ??
                    ""} ${pointsModalData?.lastName ??
                    ""} (${pointsModalData?.email ?? ""})`
                : !pointsModalData
                ? "Give Points"
                : `Give Points to ${pointsModalData?.firstName ??
                    ""} ${pointsModalData?.lastName ??
                    ""} (${pointsModalData?.email ?? ""})`
            }
            children={
              <GivePointsModal
                isDeletePoint={isDeletePoint}
                data={pointsModalData}
                onClose={() => {
                  setIsDeletePoint(false);
                  setPointsModal(false);
                  setPointsModalData(null);
                }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserTable);
