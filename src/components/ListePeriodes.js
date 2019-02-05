import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Table} from 'reactstrap';
import * as moment from 'moment';

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
                    console.log(result.periodes)

                    result.periodes.forEach(periode => {
                        console.log(periode)
                        if (periode.dateFin === null){
                            periode.dateFin = moment()
                            periode.classe = 'open'
                        }
                        var d = moment(periode.dateDebut)
                        console.log(moment().format('DD-MM-YYYY'))
                        d.format(periode.dateDebut)
                    })

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
                            <th>id</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>Heures</th>
                            <th>Minutes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.periodes.map(periode => (
                            <tr key={periode.id}>
                                <th scope="row">{periode.id}</th>
                                <td>
                                    <label className="date">{moment(periode.dateDebut).format('DD-MM-YYYY')}</label><br/>
                                    <label className="time">{moment(periode.dateDebut).format('HH:mm:ss')}</label>
                                </td>
                                <td>
                                    <label className="date">{moment(periode.dateFin).format('DD-MM-YYYY')}</label><br/>
                                    <label className={"time " + periode.classe}>{moment(periode.dateFin).format('HH:mm:ss')}</label>
                                </td>
                                <td>{periode.duree.heures}</td>
                                <td>{periode.duree.minutes}</td>
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