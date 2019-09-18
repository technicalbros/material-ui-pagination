"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
// @ts-ignore
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            pages: []
        };
        return _this;
    }
    Object.defineProperty(Pagination.prototype, "totalPages", {
        get: function () {
            var _a = this.props, limit = _a.limit, total = _a.total;
            return Math.ceil(total / limit);
        },
        enumerable: true,
        configurable: true
    });
    Pagination.prototype.nextPage = function () {
        this.changePage(this.props.page + 1);
    };
    Pagination.prototype.prevPage = function () {
        this.changePage(this.props.page - 1);
    };
    Pagination.prototype.renderPages = function () {
        var _this = this;
        var _a = this.props, limit = _a.limit, total = _a.total, page = _a.page;
        var total_pages = this.totalPages;
        var pages = [];
        var start_page = page - 2;
        var end_page = start_page + 4;
        if (end_page > total_pages) {
            end_page = total_pages;
            if (total_pages >= 5) {
                start_page = end_page - 4;
            }
        }
        if (start_page < 1) {
            start_page = 1;
            if (total_pages >= 5) {
                end_page = start_page + 4;
            }
        }
        var _loop_1 = function (i) {
            pages.push(React.createElement(core_1.IconButton, { onClick: function () {
                    if (page === i) {
                        _this.setState({
                            tmpPage: String(page),
                            showDialog: true
                        });
                    }
                    else {
                        _this.changePage(i);
                    }
                }, className: this_1.props.classes.button + " " + (page === i && this_1.props.classes.activePage), key: i }, i));
        };
        var this_1 = this;
        for (var i = start_page; i <= end_page; i++) {
            _loop_1(i);
        }
        return pages;
    };
    Pagination.prototype.closeDialog = function () {
        this.setState({ showDialog: false });
    };
    Pagination.prototype.changePage = function (page) {
        var _a = this.props, limit = _a.limit, onChange = _a.onChange;
        if (page > this.totalPages)
            page = this.totalPages;
        if (page < 1)
            page = 1;
        if (this.props.page !== page)
            onChange({ page: page, offset: limit * (page - 1) });
        this.setState({ showDialog: false });
    };
    Pagination.prototype.render = function () {
        var _this = this;
        var _a = this.props, page = _a.page, hideIfEmpty = _a.hideIfEmpty;
        var totalPages = this.totalPages;
        return (totalPages > 1 || !hideIfEmpty) ? React.createElement("div", null,
            React.createElement(core_1.IconButton, { onClick: function () { return _this.prevPage(); }, disabled: page <= 1, className: "" + this.props.classes.button },
                React.createElement("i", { className: "fa fa-chevron-left" })),
            (page > 3 && totalPages > 5) && React.createElement(core_1.IconButton, { className: "" + this.props.classes.button },
                React.createElement("i", { className: "fa fa-ellipsis-h" })),
            this.renderPages(),
            (page < (totalPages - 3) && totalPages > 5) && React.createElement(core_1.IconButton, { className: "" + this.props.classes.button },
                React.createElement("i", { className: "fa fa-ellipsis-h" })),
            React.createElement(core_1.IconButton, { onClick: function () { return _this.nextPage(); }, disabled: page >= totalPages, className: "" + this.props.classes.button },
                React.createElement("i", { className: "fa fa-chevron-right" })),
            React.createElement(core_1.Dialog, { open: !!this.state.showDialog, onClose: this.closeDialog.bind(this) },
                React.createElement("form", { onSubmit: function (e) {
                        e.preventDefault();
                        _this.changePage(Number(_this.state.tmpPage));
                    } },
                    React.createElement(core_1.DialogContent, null,
                        React.createElement("h5", null, "Page Number"),
                        React.createElement(core_1.TextField, { autoFocus: true, fullWidth: true, placeholder: "Type page number here...", value: this.state.tmpPage, type: "number", onChange: function (e) { return _this.setState({ tmpPage: e.target.value }); } })),
                    React.createElement(core_1.DialogActions, null,
                        React.createElement(core_1.Button, { size: "small", onClick: this.closeDialog.bind(this) }, "Cancel"),
                        React.createElement(core_1.Button, { size: "small", variant: "contained", color: "primary", type: "submit" }, "Jump"))))) : null;
    };
    Pagination = __decorate([
        core_1.withStyles(function (theme) { return ({
            button: {
                width: 40,
                height: 40,
                padding: 0,
                fontSize: 15
            },
            activePage: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }
            }
        }); })
    ], Pagination);
    return Pagination;
}(React.Component));
exports.default = Pagination;
