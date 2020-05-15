import {Trans, useTranslation} from "react-i18next";
import {Button, Form} from "react-bootstrap";
import React, {Fragment, useState} from "react";
import {postEmailLogin} from "../../../../../api/user";
import {useDispatch} from "react-redux";
import {getAndSetUser} from "../../../../initialize/initialize-user-state-from-api";

const ViaEMail: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const login = (event: any) => {
        postEmailLogin(email, password).then(loginJson => {
            console.log(loginJson)
            getAndSetUser(dispatch);
        }).catch(_reason => {
                setError(true);
        })
        event.preventDefault();
    }

    const feedback = (<Form.Control.Feedback type="invalid"><Trans i18nKey="errorEmailLogin"/></Form.Control.Feedback>);

    return (
        <Fragment>
            <h5 className="center">
                <Trans i18nKey="signInVia" values={{service: "E-Mail"}}/>
            </h5>
            <Form onSubmit={login}>
                <Form.Group controlId="email">
                    <Form.Control
                        isInvalid={error}
                        type="email"
                        size="sm"
                        placeholder={t("email")}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                    {feedback}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control
                        isInvalid={error}
                        type="password"
                        size="sm"
                        placeholder={t("password")}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    {feedback}
                </Form.Group>
                <Button
                    type="submit"
                    size="sm"
                    variant="primary"
                >
                    <Trans i18nKey="signIn"/>
                </Button>
            </Form>
        </Fragment>
    );
}

export { ViaEMail }
