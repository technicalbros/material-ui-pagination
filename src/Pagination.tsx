import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    TextField,
    withStyles
} from "@material-ui/core";
import PaginationProps from "./PaginationProps";
import PaginationState from "./PaginationState";

// @ts-ignore
@withStyles(theme => ({
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
}))
export default class Pagination extends React.Component<PaginationProps, PaginationState> {

    state: PaginationState = {
        pages: []
    };

    get totalPages(): number {
        const {limit, total} = this.props;
        return Math.ceil(total / limit);
    }

    nextPage() {
        this.changePage(this.props.page + 1);
    }

    prevPage() {
        this.changePage(this.props.page - 1);
    }

    renderPages(): any {
        const {limit, total, page} = this.props;
        const total_pages = this.totalPages;
        let pages = [];
        let start_page = page - 2;
        let end_page = start_page + 4;
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
        for (let i = start_page; i <= end_page; i++) {
            pages.push(
                <IconButton
                    onClick={() => {
                        if (page === i) {
                            this.setState({
                                tmpPage: String(page),
                                showDialog: true
                            })
                        } else {
                            this.changePage(i);
                        }
                    }}
                    className={`${this.props.classes.button} ${page === i && this.props.classes.activePage}`}
                    key={i}>
                    {i}
                </IconButton>
            )
        }
        return pages;
    }

    private closeDialog() {
        this.setState({showDialog: false});
    }

    private changePage(page) {
        const {limit, onChange} = this.props;

        if (page > this.totalPages)
            page = this.totalPages;
        if (page < 1)
            page = 1;

        if (this.props.page !== page)
            onChange({page, offset: limit * (page - 1)});

        this.setState({showDialog: false});
    }

    render(): React.ReactNode {

        const {page, hideIfEmpty} = this.props;
        const {totalPages} = this;

        return (totalPages > 1 || !hideIfEmpty) ? <div>
            <IconButton
                onClick={() => this.prevPage()}
                disabled={page <= 1}
                className={`${this.props.classes.button}`}>
                <i className="fa fa-chevron-left"/>
            </IconButton>
            {
                (page > 3 && totalPages > 5) && <IconButton className={`${this.props.classes.button}`}>
                    <i className="fa fa-ellipsis-h"/>
                </IconButton>
            }
            {
                this.renderPages()
            }
            {
                (page < (totalPages - 3) && totalPages > 5) && <IconButton className={`${this.props.classes.button}`}>
                    <i className="fa fa-ellipsis-h"/>
                </IconButton>
            }
            <IconButton
                onClick={() => this.nextPage()}
                disabled={page >= totalPages}
                className={`${this.props.classes.button}`}>
                <i className="fa fa-chevron-right"/>
            </IconButton>
            <Dialog open={!!this.state.showDialog} onClose={this.closeDialog.bind(this)}>
                <form onSubmit={e => {
                    e.preventDefault();
                    this.changePage(Number(this.state.tmpPage))
                }}>
                    <DialogContent>
                        <h5>Page Number</h5>
                        <TextField
                            autoFocus
                            fullWidth
                            placeholder="Type page number here..." value={this.state.tmpPage} type="number"
                            onChange={e => this.setState({tmpPage: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={this.closeDialog.bind(this)}>Cancel</Button>
                        <Button size="small" variant="contained" color="primary" type="submit">Jump</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div> : null
    }
}
