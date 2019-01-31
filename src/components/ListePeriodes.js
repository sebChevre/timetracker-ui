import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Table} from 'reactstrap';

export class ListePeriodes extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            error: null,
            isLoaded: false,
            periodes: [],
            lastUpdate: props.lastUpdate
        };

        console.log(this.state)
    }

    fillPeriodes() {
        fetch("http://localhost:9090/periodes")
            .then(res => res.json())
            .then(
                (result) => {

                    console.log(result.periodes.length)
                    console.log(this.state.periodes.length)

                        this.setState({
                            isLoaded: true,
                            periodes: result.periodes
                        });


                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)

                    this.setState({

                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fillPeriodes()
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.lastUpdate != this.props.lastUpdate){
            this.fillPeriodes()
        }

    }

    render() {

        console.log("render liste")

        return (
            <Card>
                <CardHeader>Périodes</CardHeader>
                <CardBody>
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.periodes.map(periode => (
                            <tr key={periode.id}>
                                <th scope="row">1</th>
                                <td>{periode.id}</td>
                                <td>{periode.dateDebut}</td>
                                <td>{periode.dateFin}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

        );
    }
}

export default ListePeriodes;