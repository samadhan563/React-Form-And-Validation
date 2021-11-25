import * as React from 'react';
import {Input, Col, Row, FormGroup, FormFeedback, FormText, Button} from 'reactstrap';
import {inputHandler, getValueFromKey, secureValue} from '../utils/index.js';
import {flatMap} from 'lodash';
import {Ellipsis} from './Ellipsis.jsx';

export class InputField extends React.Component {
    // renderLabel = () => {
    //     const {labelSize = 3, pullRight = true, label} = this.props;

    //     return (
    //         <Col style={pullRight ? {textAlign: 'right'} : {}} className="input-label" sm={labelSize}>
    //             <span>{label}</span>
    //         </Col>
    //     );
    // };

    render() {
        const {
            label,
            value,
            inputSize = 8,
            type = 'text',
            placeholder,
            disabled = false,
            readOnly = false,
            id,
            onBlur,
            pullRight = false,
            handler,
            keyDownHandler,
            fieldInfo = '',
            error = false,
            update,
            formName,
            isAddonButton = false,
            addonName,
            addonClickHandler,
            labelSize = 3,
            errorKey = '',
            inputStyle = {InputFieldCss},
            maxLength = 2000,
            lhHeight = false,
            inputClassName = '',
            innerRef = null,
            pullRightFormText = false,
            tooltipInfo = false,
            tooltipText = '',
            unitinfo=false,
            unit='',
            isHR=false,
            bounceIt=false
        } = this.props;

        const errorData = error ? error : getValueFromKey(value?.validation, errorKey || id);

        return (
            <FormGroup>
                <Row>
                    {label && (
                        <Col style={pullRight ? {textAlign: 'right'} : {}} className="input-label" sm={labelSize}>
                            <span className={lhHeight ? 'lh-34' : ''}>{label}</span>
                        </Col>
                    )}

                    <Col sm={unitinfo ? 8 : inputSize}>
                        <Input
                            className={inputClassName}
                            onBlur={onBlur}
                            invalid={!!errorData}
                            type={type}
                            value={value ? value[id] : ''}
                            onKeyDown={(e) => (keyDownHandler ? keyDownHandler(e.keyCode, id) : null)}
                            onChange={(e) => {
                                let inputValue = secureValue(e.target.value);

                                if (bounceIt) {
                                    console.log(e.target.value);
                                }

                                return handler
                                    ? handler(inputValue, id)
                                    : inputHandler({[id]: inputValue}, formName, update);
                            }}
                            placeholder={placeholder}
                            id={id}
                            {...(type === 'textarea' && {maxLength: maxLength})}
                            {...(type === 'password' && {maxLength: '16', minLength: '6', required: true})}
                            disabled={disabled}
                            readOnly={readOnly}
                            //style={inputStyle}
                            style={(type === 'textarea' && {maxLength: maxLength})?{boxShadow:'0px 0px 5px #888888'}:{inputStyle}}
                            innerRef={innerRef}
                        />
                        {!!errorData && <FormFeedback className="error-label-text">{errorData}</FormFeedback>}
                        {fieldInfo && (
                            <FormText style={pullRightFormText ? {float: 'right'} : {}}>{fieldInfo}</FormText>
                        )}
                    </Col>
                    {unitinfo && (
                        <div className="button-padding">
                            <span style={{fontSize:'18px'}}>{unit}</span>
                        </div>
                    )}
                    {tooltipInfo && (
                        <Col sm={1} className="button-padding">
                            <Ellipsis tooltip={tooltipText}>
                                <i className="fas fa-info"></i>
                            </Ellipsis>
                        </Col>
                    )}
                    {isAddonButton && (
                        <Col sm={1} className="button-padding">
                            <Button
                                color="primary"
                                className="pull-right"
                                onClick={(e) => (addonClickHandler ? addonClickHandler(e, id) : null)}
                            >
                                {addonName}
                            </Button>
                        </Col>
                    )}
                </Row>
                {isHR && (
                    <hr/>
                )}
            </FormGroup>
        );
    }
}

export const InputFieldCss = () => ({
    borderRadius: '2px',
    padding: '5px',
    boxShadow: '10px !important',
    padding: '10px',
    boxShadow: '0px 0px 5px #e3352f',
    border: 'none'
});
