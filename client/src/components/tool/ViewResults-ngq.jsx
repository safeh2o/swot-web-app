import React, { Component } from "react";
import DataGrid from "../elements/DataGrid";

import { Helmet } from "react-helmet";

class ViewResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      adminView: false,
      selections: []
    };
    this.adminView = false;
  }

  componentDidMount() {
    this.$table = $("#resultsTable");
    this.$archive = $("#archive");
    this.$analyze = $("#analyze");

    this.initTable();
    this.loadDataIntoTable();
  }

  componentWillUnmount() {
    hideSpinner();
  }

  loadDataIntoTable() {
    showSpinner();
    fetch("/api/results/processed")
      .then((res) => res.json())
      .then((data) => {
        hideSpinner();
        if (!data.datasets || !data.datasets.length) {
          $("#noDataContainer").removeClass("hidden");
          $("#resultsContainer").addClass("hidden");
        } else {
          $("#noDataContainer").addClass("hidden");
          $("#resultsContainer").removeClass("hidden");
        }
        this.$table.bootstrapTable("hideLoading", []);
        const { datasets, adminView } = data;
        this.setState({ adminView, tableData: datasets });
        this.loadSites(datasets);
        this.loadTableBySelectedSite();
      });
  }

  loadTableBySelectedSite() {
    const selectedSiteId = $("#sites option:selected").val();
    if (selectedSiteId) {
      const dataByFirstSite = this.state.tableData.filter((d) => {
        return d.fieldsiteId == selectedSiteId;
      });
      this.$table.bootstrapTable("load", dataByFirstSite);
    }
  }

  loadSites(data) {
    const sitesMapped = data.map((d) => {
      return {
        country: d.countryName,
        project: d.projectName,
        name: d.fieldsiteName,
        id: d.fieldsiteId,
      };
    });
    const sites = sitesMapped.filter((elem, index) => {
      return (
        index ===
        sitesMapped.findIndex((obj) => {
          return JSON.stringify(obj) === JSON.stringify(elem);
        })
      );
    });
    $("#sites").empty();
    $.each(sites, function (index, fieldsite) {
      $("#sites").append(
        $("<option></option>")
          .attr("value", fieldsite.id)
          .attr("selected", index === 0)
          .text(
            `${fieldsite.country} > ${fieldsite.project} > ${fieldsite.name}`
          )
      );
    });
    return sites;
  }

  getIdSelections() {
    return $.map(
      this.$table.bootstrapTable("getSelections"),
      function (row) {
        return row.datasetId;
      }
    );
  }

  responseHandler(res) {
    $.each(res.rows, function (i, row) {
      row.state = $.inArray(row.datasetId, selections) !== -1;
    });
    return res;
  }

  detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
      html.push("<p><b>" + key + ":</b> " + value + "</p>");
    });
    return html.join("");
  }

  nameFormatter(value, row) {
    if (this.state.adminView) {
      return `<a target='_blank' href='/admin/datasets/${row.datasetId}' title='View in Admin Panel'>${value}</a>`;
    } else {
      return value;
    }
  }

  statusFormatter(value, row) {
    if (
      row.datasetArtifacts &&
      row.datasetArtifacts.length &&
      this.hasPdf(row.datasetArtifacts)
    ) {
      return `<a target='_blank' href='/api/results/download?datasetId=${row.datasetId}&archived=false' title='Download Results'>Download</a>`;
    } else {
      return "<label>Processing</label>";
    }
  }

  dateFormatter(value, row) {
    // convert to YYYY-MM-DD HH-MM a
    const d = new Date(value);
    const pad = (num) => num.toString().padStart(2, "0");
    let hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    // if 0 change to 12
    hours = hours == 0 ? 12 : hours;

    const formattedDate = `${d.getFullYear()}-${pad(
      d.getMonth() + 1
    )}-${pad(d.getDate())} ${hours}:${pad(d.getMinutes())} ${ampm}`;

    return formattedDate;
  }

  hasPdf(filenames) {
    return filenames.some((filename) => filename.endsWith(".pdf"));
  }

  initTable() {
    this.$table
      .bootstrapTable("destroy")
      .bootstrapTable("hideLoading")
      .bootstrapTable({
        locale: "en-US",
        columns: [
          [
            {
              field: "state",
              checkbox: true,
              rowspan: 2,
              align: "center",
              valign: "middle",
            },
            {
              title: "ANALYSIS RESULTS",
              colspan: 6,
              align: "center",
            },
          ],
          [
            {
              field: "datasetId",
              visible: false,
            },
            {
              field: "datasetName",
              title: "Dataset Name",
              sortable: true,
              align: "center",
              formatter: (val, row) =>
                this.nameFormatter(val, row),
            },
            {
              field: "datasetDesc",
              title: "Description",
              sortable: true,
              align: "center",
            },
            {
              field: "datasetDate",
              title: "Date Uploaded",
              sortable: true,
              align: "center",
              formatter: this.dateFormatter,
            },
            {
              field: "fieldsiteName",
              title: "Site",
              sortable: true,
              align: "center",
            },
            {
              field: "status",
              title: "Status",
              sortable: true,
              align: "center",
              formatter: (val, row) =>
                this.statusFormatter(val, row),
            },
            {
              field: "datasetArtifacts",
              visible: false,
            },
            {
              field: "datasetDesc",
              visible: false,
            },
          ],
        ],
      });
    this.$table.on(
      "check.bs.table uncheck.bs.table " +
      "check-all.bs.table uncheck-all.bs.table",
      () => {
        // save your data, here just save the current page
        this.setState({ selections: this.getIdSelections() });
        // push or splice the selections if you want to save all data selections
      }
    );
    this.$table.on("all.bs.table", function (e, name, args) {
      // console.log(name, args)
    });

    this.$table.on("refresh.bs.table", () => {
      showSpinner();
      this.loadDataIntoTable();
    });
    this.$table.on("page-change.bs.table", () => {
      this.handlePageSwitch();
    });
  }

  handleArchive() {
    showSpinner();
    var ids = this.getIdSelections();
    $.get(
      `/api/results/archive?datasetIds=${JSON.stringify(ids)}`,
      null,
      () => {
        this.$table.bootstrapTable("remove", {
          field: "id",
          values: ids,
        });

        this.$table.bootstrapTable("uncheckAll");
        this.loadDataIntoTable();
      }
    );
  }

  handlePageSwitch() {
    this.setState({ selections: [] });
  }

  handleReanalyze() {
    showSpinner();
    var ids = this.getIdSelections();
    $.get(
      `/api/results/analyze?datasetIds=${JSON.stringify(ids)}`,
      null,
      (response) => {
        hideSpinner();
        alert(response);

        this.$table.bootstrapTable("uncheckAll");
      }
    );
  }

  render() {
    return (
      <>
        <Helmet>
          <link
            rel="stylesheet"
            href="//unpkg.com/bootstrap-table@1.15.3/dist/bootstrap-table.min.css"
          />
        </Helmet>

        <h1 className="content-title">
          <span>Results</span>
        </h1>

        <section className="content-window">
          <header></header>
          <section style={{ height: 400, width: '100%', margin: 0 }}>
            <DataGrid
              rows={[
                { datasetId: 1, datasetDate: "", datasetName: 'Snow', fieldsiteName: 'Essian', status: 1 },
                { datasetId: 2, datasetDate: "", datasetName: 'Lannister', fieldsiteName: 'Essian', status: 0 },
                { datasetId: 3, datasetDate: "", datasetName: 'Lannister', fieldsiteName: 'Essian', status: 1 },
                { datasetId: 4, datasetDate: "", datasetName: 'Stark', fieldsiteName: 'Essian', status: 1 },
                { datasetId: 5, datasetDate: "", datasetName: 'Targaryen', fieldsiteName: 'Essian', status: 1 },
                { datasetId: 6, datasetDate: "", datasetName: 'Melisandre', fieldsiteName: 'Essian', status: 0 },
                { datasetId: 7, datasetDate: "", datasetName: 'Clifford', fieldsiteName: 'Bardarash', status: 0 },
                { datasetId: 8, datasetDate: "", datasetName: 'Frances', fieldsiteName: 'Bardarash', status: 0 },
                { datasetId: 9, datasetDate: "", datasetName: 'Roxie', fieldsiteName: 'Bardarash', status: 1 },
              ]}
              columns={[
                { id: 'datasetId', label: 'id', width: 60 },
                { id: 'datasetName', label: 'Name / Date Range', width: 150 },
                { id: 'fieldsiteName', label: 'Fieldsites', width: 150 },
                { id: 'status', label: 'Status', numeric: true, width: 110 },
              ]}
            />
          </section>
          <footer></footer>
        </section>

        <div className="container">
          <div className=" px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4" id="headerText">
              Analysis Results
						</h1>
          </div>
        </div>

        <div className="container hidden" id="noDataContainer">
          <div className="jumbotron shadow-sm">
            <div className="row">
              <div className="col-sm-12 col-md-12 align-middle">
                <h2>No data available</h2>

                <p className=" lead">
                  You don't seem to have any data results
                  available yet. Upload your dataset to
                  start analysis. Analysis results may be
                  delayed up to 5 minutes.
								</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mb-4" id="resultsContainer">
          <div className="select">
            <select
              className="form-control"
              id="sites"
              onChange={() => {
                this.loadTableBySelectedSite();
              }}
            ></select>
          </div>

          <table
            id="resultsTable"
            data-toolbar="#toolbar"
            data-search="false"
            data-show-refresh="true"
            data-show-toggle="false"
            data-show-fullscreen="false"
            data-show-columns="false"
            data-detail-view="false"
            data-show-export="false"
            data-click-to-select="true"
            data-detail-formatter="detailFormatter"
            data-minimum-count-columns="2"
            data-show-pagination-switch="false"
            data-pagination="true"
            data-id-field="id"
            data-page-size="10"
            data-page-list="[10, 25, 50, 100, all]"
            data-show-footer="false"
            data-side-pagination="local"
            data-response-handler="responseHandler"
          ></table>

          <div id="toolbar">
            <button
              id="archive"
              className="btn btn-danger"
              onClick={() => {
                this.handleArchive();
              }}
              disabled={this.state.selections.length === 0}
            >
              <i className="glyphicon glyphicon-remove"></i>{" "}
							Archive Selected
						</button>
            <button
              id="analyze"
              className="btn btn-warning"
              onClick={() => {
                this.handleReanalyze();
              }}
              disabled={this.state.selections.length === 0}
            >
              <i className="glyphicon glyphicon-remove"></i>{" "}
							Reanalyze Selected
						</button>
          </div>
        </div>
      </>
    );
  }
}

export default ViewResults;
