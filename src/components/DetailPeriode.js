import React, { Component } from 'react';
import { Card, CardBody,CardHeader, Button, FormGroup, Label,Input, Form } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker'

export class DetailPeriode extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dateDebut: new Date(),
            dateFin: new Date()
        }

    }




    onDebutChange = dateDebut => {
        this.setState({ dateDebut });
        console.log("dadebut change: " + this.state.dateDebut);
    }

    onFinChange = dateFin => {
        this.setState({ dateFin });
        console.log("date fin change: "  +this.state.dateFin);
    }

    creer = () => {

        console.log("dateDebut : " + this.state.dateDebut + "dateFin: " + this.state.dateFin )

        fetch('http://localhost:9090/periodes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                debut: this.state.dateDebut,
                fin: this.state.dateFinn
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.props.onCreeEvent()

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error)


                }
            )
    }

    render() {

        console.log("render detail")
        return (
            <Card>
                <CardHeader>Nouvelle Période</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="debut">Date début: </Label>
                            <DateTimePicker locale="fr-CH" name="debut" onChange={this.onDebutChange} value={this.state.dateDebut}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="fin">Date fin: </Label>
                            <DateTimePicker locale="fr-CH" name="fin" onChange={this.onFinChange} value={this.state.dateFin}/>
                        </FormGroup>

                        <Button onClick={this.creer} color="success">Créer période</Button>
                    </Form>
                </CardBody>
            </Card>

        );
    }
}