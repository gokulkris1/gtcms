import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import Button from "components/button/Button";
import Pagination from "components/common/Pagination";
import "react-table/react-table.css";
import { withRouter } from "react-router";

import Api from "api/Api";
import CommonModal from "components/common/CommonModal";
import FeedbackModal from "./FeedbackModal";
import Loader from "components/common/Loader";
import Toaster from "components/common/Toaster";
import fileDownload from "js-file-download";
import moment from "moment";
let debounceTimer;

const FeedbackTable = props => {
  const [tblData, settblData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("DESC");
  const [field, setField] = useState("email");
  const [viewModal, setviewModal] = useState(false);
  const [viewData, setviewData] = useState(null);
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const toaster = useRef();

  const columns = [
    {
      Header: "Name",
      accessor: "firstName",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      sortable: false,
      Cell: props => (
        <div>
          {props.original.firstName ?? ""} {props.original.lastName ?? ""}
        </div>
      )
    },
    {
      Header: "Email",
      accessor: "email",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Comment",
      accessor: "comment",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Store Name",
      accessor: "storeName",
      className: "text-center",
      filterable: false,
      sortable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Rating",
      accessor: "rating",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      Cell: props => (
        <div>
          <i className="fas fa-star starRating"></i>
          {props.original.rating}
        </div>
      )
    },
    {
      Header: "From",
      accessor: "feedbackFrom",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class",
      sortable: false
    },
    {
      Header: "Action",
      accessor: "action",
      className: "text-center",
      headerClassName: "react-table-header-class",
      sortable: false,
      filterable: false,
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
    const url = "/admin/feedbacklist";
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
    const response = await Api.get("/admin/exportCSV/feedback");
    const fileName = `feedbacks-${moment().format("MM-DD-YYYY")}.csv`;

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
              <span className="hash"># </span> Feedback List
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
            </div>
          </div>
          <div className="roe-card-body">
            <ReactTable
              style={{
                border: "none",
                boxShadow: "none"
              }}
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
                    property: "createdAt"
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
            modal={viewModal}
            toggle={() => {
              setviewModal(!viewModal);
            }}
            viewModalCheck={true}
            headerData={"Feedback Details"}
            children={<FeedbackModal data={viewData} />}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(FeedbackTable);
