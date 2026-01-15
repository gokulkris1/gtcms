import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactTable from "react-table";
import Button from "components/button/Button";
import Pagination from "components/common/Pagination";
import "react-table/react-table.css";
import { withRouter } from "react-router";

import Api from "api/Api";
import CommonModal from "components/common/CommonModal";
import UserModal from "./UserModal";
import Loader from "components/common/Loader";
import Toaster from "components/common/Toaster";
import fileDownload from "js-file-download";
import moment from "moment";
import { ButtonGroup, Button as RButton } from "reactstrap";
let debounceTimer;

const UserTable = ({ isStore = false, ...props }) => {
  const [tblData, settblData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("DESC");
  const [field, setField] = useState("createdAt");
  const [viewModal, setviewModal] = useState(false);
  const [viewData, setviewData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [deviceType, setDeviceType] = useState("ALL");
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const toaster = useRef();

  const { history, storeId } = props;

  const formAction = useCallback(
    (action, data = null) => {
      // Here you can view the data and make forward action for edit data
      if (action === "add") {
        !isStore
          ? history.push("/device/add")
          : history.push("/store/device/add");
      } else if (action === "edit") {
        !isStore
          ? history.push(`/device/edit/${data.deviceTokenId}`, data)
          : history.push(`/store/device/edit/${data.deviceTokenId}`, data);
        // history.push(`/device/edit/${data.deviceTokenId}`, data);
      }
    },
    [history]
  );

  const columns = [
    {
      Header: "DeviceId",
      accessor: "deviceTokenId",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Email",
      accessor: "email",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      width: 300
    },
    {
      Header: "Password",
      accessor: "passwordField",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      width: 150
    },
    {
      Header: "StoreId",
      accessor: "storeId",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Store Name",
      accessor: "storeName",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      width: 200
    },
    {
      Header: "BranchId",
      accessor: "branchId",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Branch Name",
      accessor: "branchName",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      width: 200
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
            <div id={`active-${props.original.id}`}>
              <button
                style={{ minWidth: "125px" }}
                className="c-btn c-info mr-10"
                onClick={() => {
                  activeInactiveStatusHandler(props.original);
                }}
                disabled={deviceType === "DELETED"}
              >
                <div className="fs-14 medium-text">
                  <i className="fas fa-toggle-off mr-6" /> Active
                </div>
              </button>
            </div>
          ) : (
            <div id={`deactive-${props.original.id}`}>
              <Button
                style={{ minWidth: "125px" }}
                className="c-btn c-warning mr-10"
                onClick={() => activeInactiveStatusHandler(props.original)}
                disabled={deviceType === "DELETED"}
              >
                <div className="fs-14 medium-text">
                  <i className="fas fa-toggle-on mr-6" /> InActive
                </div>
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
      width: deviceType === "ALL" ? 300 : 120,
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
          {deviceType === "ALL" && (
            <>
              <Button
                className="c-btn c-success mr-10"
                onClick={() => formAction("edit", props.original)}
              >
                <div className="fs-14 medium-text">
                  <i className="fas fa-edit mr-6" /> Edit
                </div>
              </Button>
              <Button
                className="c-btn c-danger"
                id="delete"
                onClick={() => {
                  setToggle(!toggle);
                  setdeleteId(props.original.deviceTokenId);
                }}
              >
                <div className="fs-14 medium-text">
                  <i className="fas fa-trash mr-6" /> Delete
                </div>
              </Button>
            </>
          )}
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
    setSearchText("");
    const params = {
      page: {
        limit: 10,
        pageId: 1
      },
      sortBy: {
        direction: "DESC",
        property: "createdAt"
      },
      search: "",
      deviceFilterType: deviceType
    };
    callListApi(params);
    setPages(10);
  }, [isStore, deviceType]);

  const callListApi = params => {
    setLoader(true);
    const url = !isStore
      ? "/admin/device/list"
      : `/admin/device/list?storeId=${storeId}`;
    Api.post(url, params)
      .then(res => {
        settblData(res.data.data.list);
        if (isStore && res.data.data.list) {
          props.setStoreDeviceCounts(res.data.data.list.length);
        }
        setLoader(false);
        setPages(Math.ceil(res.data.data.totalRecords / 10));
      })
      .catch(err => {
        if (toaster.current) toaster.current.error(err.message);
        setLoader(false);
      });
  };

  const activeInactiveStatusHandler = data => {
    setLoading(true);
    Api.put(
      `/admin/device/changeStatus?deviceTokenId=${
        data.deviceTokenId
      }&isActive=${!data.active}
    `
    )
      .then(res => {
        if (toaster.current) toaster.current.success(res.data.message);
        callListApi({
          page: {
            limit: 10,
            pageId: activePage + 1
          },
          search: searchText,
          deviceFilterType: deviceType,
          sortBy: {
            direction: sortBy,
            property: field
          }
        });
      })
      .catch(error => {
        if (toaster.current) toaster.current.error(error.response);
      });
  };

  const viewHandler = data => {
    setviewData(data);
    setviewModal(true);
  };

  const downloadCSV = async () => {
    setIsCsvLoading(true);
    const response = await Api.get(
      `/admin/device/exportCSV?deviceFilterType=${deviceType}&search=${searchText}&storeId=${
        isStore ? storeId : ""
      }`
    );
    const fileName = `devices-${deviceType.toLowerCase()}-${moment().format(
      "MM-DD-YYYY"
    )}.csv`;

    if (response) {
      fileDownload(response.data, fileName);
    }
    if (response.status === 200) {
      toaster.current.success("CSV file downloaded");
    }
    setIsCsvLoading(false);
  };

  const handleYes = () => {
    setLoading(true);
    Api.delete(`/admin/device/delete?deviceTokenId=${deleteId}`)
      .then(res => {
        if (toaster.current) toaster.current.success(res.data.message);
        callListApi({
          page: {
            limit: 10,
            pageId: activePage + 1
          },
          search: searchText,
          deviceFilterType: deviceType,
          sortBy: {
            direction: sortBy,
            property: field
          }
        });
        setLoading(false);
        setToggle(!toggle);
      })
      .catch(error => {
        setLoading(false);
        setToggle(!toggle);
        if (toaster.current) toaster.current.error(error.response);
      });
  };

  return (
    <div>
      <div className="plr-15">
        <div className="roe-card-style mtb-15">
          <div className="roe-card-header module-header">
            <div className="flex-1 fs-16 demi-bold-text">
              <span className="hash"># </span> Device List
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
                    },
                    deviceFilterType: deviceType
                  });
                  setSearchText(e.target.value);
                }}
                type="text"
                placeholder="Search..."
                className="fs-14 medium-text plr-10 form-control react-form-input"
              />
            </div>
            <div className="mr-1">
              <ButtonGroup style={{ height: 34 }}>
                <RButton
                  color="secondary"
                  outline
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => setDeviceType("ALL")}
                  active={deviceType === "ALL"}
                >
                  ALL
                </RButton>
                <RButton
                  color="secondary"
                  outline
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={() => setDeviceType("DELETED")}
                  active={deviceType === "DELETED"}
                >
                  DELETED
                </RButton>
              </ButtonGroup>
            </div>
            <div>
              <Button
                className="c-btn ma-5"
                onClick={() => formAction("add")}
                style={{
                  backgroundColor: "#4CBB17",
                  color: "#fff"
                }}
              >
                <i className="fas fa-plus mr-10"></i>Add Device
              </Button>
              {!!tblData.length && (
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
                  deviceFilterType: deviceType,
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
                  deviceFilterType: deviceType,
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
            modal={viewModal}
            toggle={() => {
              setviewModal(!viewModal);
            }}
            viewModalCheck={true}
            headerData={"Device Details"}
            children={<UserModal data={viewData} />}
          />
          <CommonModal modal={toggle}>
            <div className="react-table-header-class text-center ptb-18">
              Are you sure you want to delete?
            </div>
            <div className="text-center pb-15">
              <Button
                className="c-btn c-success mr-10 plr-30"
                onClick={handleYes}
                loading={loading}
                disabled={loading}
                dataStyle="expand-right"
              >
                Yes
              </Button>
              <Button
                className="c-btn c-danger plr-30"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                No
              </Button>
            </div>
          </CommonModal>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserTable);
