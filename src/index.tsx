import * as React from "react";
import {Button, IconButton, withStyles} from "@material-ui/core";
import {ReactChild, ReactChildren} from "react";
import {updateState} from "react-extended-component/src";

// @ts-ignore
@withStyles({
    button: {
        width: 40,
        height: 40,
        padding: 0,
        fontSize: 15
    }
})
export class Pagination extends React.Component {

    props: {
        classes?: {
            button: string
        },
        limit: number,
        total: number,
        page: number,
        onChange: (data: { page: number, offset?: number }) => void
    }

    state: any = {
        pages: []
    }

    renderPages(): any {
        const {limit, total, page} = this.props;
        const total_pages = Math.ceil(total / limit);
        let pages = [];
        let start_page = page - 2
        if (start_page < 1)
            start_page = 1;
        for (let i = start_page; i <= (start_page + 4); i++) {
            pages.push(<IconButton onClick={() => this.props.onChange({page: i})}
                                   className={`${this.props.classes.button}`} key={i}>{i}</IconButton>)
        }
        return pages;
    }

    render(): React.ReactNode {
        return <div>
            <IconButton className={`${this.props.classes.button}`}>
                <i className="fa fa-chevron-left"/>
            </IconButton>
            {
                this.renderPages()
            }
            <IconButton className={`${this.props.classes.button}`}>
                <i className="fa fa-chevron-right"/>
            </IconButton>
        </div>
    }
}
