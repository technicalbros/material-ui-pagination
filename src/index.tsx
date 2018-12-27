import * as React from "react";
import {Button, IconButton, withStyles} from "@material-ui/core";
import {ReactChild, ReactChildren} from "react";

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
        onChange: (data: { page: number, offset: number }) => void
    }

    state: any = {
        pages: []
    }

    renderPages(): any {
        const {limit, total} = this.props;
        const total_pages = Math.ceil(total / limit);
        let pages = [];
        for (let i = 1; i <= total_pages; i++) {
            pages.push(<IconButton className={`${this.props.classes.button}`} key={i}>{i}</IconButton>)
        }
        return pages;
    }

    render(): React.ReactNode {
        return <div>
            {
                this.renderPages()
            }
        </div>
    }
}
