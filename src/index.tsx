import * as React from "react";
import {Button, IconButton, withStyles} from "@material-ui/core";
import {ReactChild, ReactChildren} from "react";
import {updateState} from "react-extended-component/src";

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
        color: theme.palette.primary.contrastText
    }
}))
export class Pagination extends React.Component {

    props: {
        classes?: {
            button: string,
            activePage: string
        },
        hideIfEmpty?: boolean,
        limit: number,
        total: number,
        page: number,
        onChange: (data: { page: number, offset?: number }) => void
    }

    state: any = {
        pages: []
    }

    get totalPages(): number {
        const {limit, total, page} = this.props;
        const total_pages = Math.ceil(total / limit)
        return total_pages;
    }

    nextPage() {
        this.props.onChange({
            page: this.props.page + 1
        });
    }

    prevPage() {
        this.props.onChange({
            page: this.props.page - 1
        });
    }

    renderPages(): any {
        const {limit, total, page} = this.props;
        const total_pages = this.totalPages;
        let pages = [];
        let start_page = page - 2
        let end_page = start_page + 4;
        if (end_page > total_pages) {
            end_page = total_pages
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
                    onClick={() => this.props.onChange({page: i})}
                    className={`${this.props.classes.button} ${page === i && this.props.classes.activePage}`}
                    key={i}>
                    {i}
                </IconButton>
            )
        }
        return pages;
    }

    render(): React.ReactNode {

        const {page, total, limit, hideIfEmpty} = this.props;
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
        </div> : null
    }
}
