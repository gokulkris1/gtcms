import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactTable from "react-table";
import Button from "components/button/Button";
import Pagination from "components/common/Pagination";
import "react-table/react-table.css";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";

import storelogo from "assets/images/storelogo.png";
import Api from "api/Api";
import CommonModal from "components/common/CommonModal";
import ShoppingModal from "./ShoppingModal";
import Loader from "components/common/Loader";
import Toaster from "components/common/Toaster";
let debounceTimer;

const ShoppingTable = props => {
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
  const toaster = useRef();

  const { history } = props;

  const formAction = useCallback(
    (action, data = null) => {
      // Here you can view the data and make forward action for edit data
      if (action === "add") {
        history.push("/shopping/add");
      } else if (action === "edit") {
        history.push(`/shopping/edit/${data.id}`, data);
      }
    },
    [history]
  );

  const columns = [
    {
      Header: "Store Logo",
      accessor: "storeLogo",
      className: "text-center",
      sortable: false,
      filterable: false,
      headerClassName: "react-table-header-class",
      width: 100,
      Cell: props => (
        <div>
          <img
            src={
              props.original.storeLogo ? props.original.storeLogo : storelogo
            }
            alt="error"
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
        </div>
      )
    },
    {
      Header: "Store Name",
      accessor: "storeName",
      className: "text-center",
      filterable: false,
      headerClassName: "react-table-header-class"
    },
    {
      Header: "Link",
      accessor: "link",
      className: "text-center",
      filterable: false,
      sortable: false,
      headerClassName: "react-table-header-class"
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   className: "text-center",
    //   headerClassName: "react-table-header-class",
    //   sortable: false,
    //   filterable: false,
    //   width: 180,
    //   Cell: (props) => (
    //     <div className="react-action-class">
    //       {props.original.isActive ? (
    //         <RoyTooltip
    //           id={`active-${props.original.id}`}
    //           title={"Click to Deactivate"}
    //           placement="left"
    //         >
    //           <div id={`active-${props.original.id}`}>
    //             <button
    //               style={{ minWidth: "125px" }}
    //               className="c-btn c-info mr-10"
    //               onClick={() => {
    //                 console.log("props", props);
    //                 activeInactiveStatusHandler(props.original);
    //               }}
    //             >
    //               <div className="fs-14 medium-text">
    //                 <i className="fas fa-toggle-off mr-6" /> Active
    //               </div>
    //             </button>
    //           </div>
    //         </RoyTooltip>
    //       ) : (
    //         <RoyTooltip
    //           id={`deactive-${props.original.id}`}
    //           title={"Click to Active"}
    //           placement="left"
    //         >
    //           <div id={`deactive-${props.original.id}`}>
    //             <Button
    //               style={{ minWidth: "125px" }}
    //               className="c-btn c-warning mr-10"
    //               onClick={() => activeInactiveStatusHandler(props.original)}
    //             >
    //               <div className="fs-14 medium-text">
    //                 <i className="fas fa-toggle-on mr-6" /> InActive
    //               </div>
    //             </Button>
    //           </div>
    //         </RoyTooltip>
    //       )}
    //     </div>
    //   ), // Custom cell components!
    // },
    {
      Header: "Action",
      accessor: "action",
      className: "text-center",
      headerClassName: "react-table-header-class",
      sortable: false,
      filterable: false,
      width: 420,
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
              setdeleteId(props.original.id);
            }}
          >
            <div className="fs-14 medium-text">
              <i className="fas fa-trash mr-6" /> Delete
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
    Api.post("/admin/shopping/list", params)
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

  // const activeInactiveStatusHandler = (data) => {
  //   // console.log('tblData', tableRef.current.state.data)
  //   // console.log('activePgae', tableRef.current.state.page)
  //   setSnackBar({
  //     flag: true,
  //     heading: "Status Change Action",
  //     description: `you have to call api to change status, Your id is: ${data.id}`,
  //   });
  // };

  const viewHandler = data => {
    setviewData(data);
    setviewModal(true);
  };

  const handleYes = () => {
    setLoading(true);
    Api.delete(`/admin/shopping/delete?shoppingId=${deleteId}`)
      .then(res => {
        if (toaster.current) toaster.current.success(res.data.message);
        callListApi({
          page: {
            limit: 10,
            pageId: activePage + 1
          },
          search: searchText,
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
              <span className="hash"># </span> Shopping Link List
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
                onClick={() => formAction("add")}
                style={{
                  backgroundColor: "#4CBB17",
                  color: "#fff"
                }}
              >
                <i className="fas fa-plus mr-10"></i>Add Shopping Link
              </Button>
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
            modal={viewModal}
            toggle={() => {
              setviewModal(!viewModal);
            }}
            viewModalCheck={true}
            headerData={"Shopping Link Details"}
            children={<ShoppingModal data={viewData} />}
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

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

export default compose(
  connect(mapStateToProps, null),
  withRouter
)(ShoppingTable);
