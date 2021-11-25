import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Col, Row, Button, FormGroup, Table} from 'reactstrap';
import {ConfirmationModal} from '../reusableComponents/ConfirmationModal';
import {FormModel} from '../model/FormModel';
import {InputField} from '../reusableComponents/InputField';
import {RadioButton} from '../reusableComponents/RadioButton';
import {SingleDatePicker} from '../reusableComponents/SingleDatePicker';
import {SelectField} from '../reusableComponents/SelectField';
import {customStyles, customStyleForTestsList} from '../themes/constants/style';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    UPDATE_GRN,
    UPDATE_MATERIAL_VEHICLE_DETAILS,
    UPDATE_MATERIAL_CHALLAN_DETAILS,
    UPDATE_MATERIAL_QUANTITY_DETAILS,
    UpdateMaterialData
} from './constant';
import {getMandatoryIconWithCheck} from '../reusableComponents/CustomComponent';
import {ImageEditor} from '../reusableComponents/ImageEditor';
import {getMaterialAgainstSupplier,getGrnNo,inwordMaterialEntry} from '../services/Resource';
import {createOptionForReactSelect} from '../utils';
const FontAwesome = require('react-fontawesome');

export class AddEditUpdateMaterial extends Component {
    static defaultProps = {
        materialList: [],
        data: UpdateMaterialData
    };
    state = {
        formName: 'inwordMaterialEntry',
        startDate: new Date(),
        selectedBillType: '',
        src: '',
        selectedSupplier: {},
        selectedMaterial: {},
        materialListOption: [],
        materialMapping: [],
        quantity: '12334',
        GRN_NO: '12',
    };
    constructor(props) {
        super(props);
        new FormModel(this.state.formName).$createForm({
            validation: {},
            ...props.data
        });
    }
    componentDidMount() {
        const {startDate} = this.state;
        const {materialList} = this.props;
        if (materialList) {
            let materialListOption = createOptionForReactSelect(materialList, 'name', 'id');
            this.setState({materialListOption});
        }
        const formData = FormModel.getAll(this.state.formName);
        if (formData && formData.inword_material_details_mapping) {
            this.setState({
                materialMapping: formData.inword_material_details_mapping,
                src: formData.image_url
            });
            new FormModel('inwordMaterialEntry').$update({resource: formData.inword_material_details_mapping});
        }
        if (formData && formData.suppiler_id) {
            let obj = {
                label: formData.suppiler_name,
                value: formData.suppiler_id
            };
            this.setState({selectedSupplier: obj});
            this.getMaterialData({...obj, id: formData.suppiler_id});
        }
        if (formData && formData.reviceing_date) {
            this.setState({
                startDate: new Date(formData.reviceing_date)
            });
            new FormModel('inwordMaterialEntry').$update({
                reviceing_date: moment(formData.reviceing_date).format('YYYY-MM-DD HH:mm:ss')
            });
        } else {
            new FormModel('inwordMaterialEntry').$update({
                reviceing_date: moment(startDate).format('YYYY-MM-DD HH:mm:ss')
            });
        }
        this.fetchGRNDetails();
        // this.fetchPOList();
    }
    fetchGRNDetails = () => {
        getGrnNo(
            (response) => {
                const formData = FormModel.getAll(this.state.formName);
                // let grnNo = createOptionForReactSelect(response, 'grn_no');
                console.log('response:- ',response);
                // console.log('grn no:- ',grnNo);
                console.log('response.data:- ',response.data);
                // this.state.GRN_NO = response.data
                // console.log('stete.grn:- ',this.state.GRN_NO);
                this.setState({GRN_NO:response.data});
                // new FormModel('inwordMaterialEntry').$update({resource: formData.data});
            },
            (error) => console.log('error', error)
        );
        // getPOListDetails(
        //             (response) => {
        //                 console.log('PO List response:- ',response);
        //             },
        //             (error) => console.log('error', error)
        //         );
    };
    // fetchPOList = () => {
    //     getPOListDetails(
    //         (response) => {
    //             console.log('PO List response:- ',response);
    //         },
    //         (error) => console.log('error', error)
    //     );
    // };
    formRelatedProps = () => {
        const {formName} = this.state;
        console.log("formName== ",formName);
        console.log("FormModel.getAll(this.state.formName)== ",FormModel.getAll(this.state.formName));
        return {
            value: FormModel.getAll(this.state.formName),
            update: () => this.forceUpdate(),
            formName
        };
    };
    imageEditHandlerHeader = (src) => {
        this.setState({src});
        new FormModel(this.state.formName).$update({['inword_material_details_attachment']: src});
    };
    getMaterialData = (data) => {
        this.setState({
            materialMapping: [],
            quantity: ''
        });

        getMaterialAgainstSupplier(
            parseInt(data.id),
            (response) => {
                this.setState(
                    {
                        materialListOption: createOptionForReactSelect(response, 'name', 'id'),
                        selectedSupplier: data
                    },
                    () => {
                        new FormModel(this.state.formName).$update({['suppiler_id']: parseInt(data.id)});
                    }
                );
                // For Edit Mode only
                const formData = FormModel.getAll(this.state.formName);
                if (formData && formData.inword_material_details_mapping) {
                    this.setState({
                        materialMapping: formData.inword_material_details_mapping
                    });

                    const {materialMapping, materialListOption} = this.state;

                    let yFilter = materialMapping.map((itemY) => {
                        return itemY.material_id;
                    });
                    let filteredX = materialListOption.filter((itemX) => !yFilter.includes(itemX.resource_id));
                    this.setState({
                        materialListOption: filteredX
                    });
                    console.log('materialMapping', materialMapping);
                    console.log('materialListOption', materialListOption);
                    console.log('yFilter', yFilter);
                    console.log('filteredX', filteredX);

                    new FormModel('inwordMaterialEntry').$update({resource: formData.inword_material_details_mapping});
                }
            },
            (error) => console.log('error', error)
        );
    };
    handleApply = (date) => {
        // const {startDate} = picker;

        new FormModel('inwordMaterialEntry').$update({
            reviceing_date: moment(date).format('YYYY-MM-DD HH:mm:ss')
        });
        this.setState({
            startDate: date
        });
       
    };
    onFileChangeHandler = (e, selectedFile) => {
        e.preventDefault();
        let file = e.target.files[0];
        this.setState(
            {
                [selectedFile]: file
            },
            () => {
                new FormModel(this.state.formName).$update({
                    ['selectedFile']: file
                });
            }
        );
    };
    inputHandler = (value, id) => {
        this.setState({[id]: value});
    };
    updateMaterialToForm = () => {
        const {materialMapping} = this.state;

        new FormModel('inwordMaterialEntry').$update({resource: materialMapping});
    };
    mappedMaterial = () => {
        const {materialMapping, selectedMaterial, selectedSupplier, materialListOption, quantity} = this.state;
        console.log(selectedMaterial);

        this.setState(
            {
                materialMapping: [
                    ...materialMapping,
                    {
                        material_id: selectedMaterial.resource_id,
                        material_name: selectedMaterial.label,
                        material_unit: selectedMaterial.unit,
                        quantity: quantity,
                        unit: selectedMaterial.unit
                    }
                ],
                materialListOption: materialListOption.filter((ins) => ins.value !== selectedMaterial.value)
            },
            () => {
                this.updateMaterialToForm();
            }
        );
        this.setState({
            selectedMaterial: {},
            quantity: ''
        });
    };
    removeResourceMapping = (instance) => {
        const {materialListOption} = this.state;
        console.log('instance', instance);
        this.setState(
            {
                materialMapping: this.state.materialMapping.filter((item) => item.id !== instance.id),
                materialListOption: [
                    ...materialListOption,
                    {
                        value: instance.material_id,
                        resource_id: instance.material_id,
                        label: instance.material_name,
                        name: instance.material_name,
                        unit: instance.material_unit
                    }
                ]
            },
            () => {
                this.updateMaterialToForm();
            }
        );
    };
    renderMappingTable = () => {
        const {materialMapping} = this.state;

        return (
            <Table className="test-list">
                {!!materialMapping.length && (
                    <thead>
                        <tr className="fs-12 input-label" style={{borderBottom: '0px'}}>
                            <th>Material Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th> </th>
                        </tr>
                    </thead>
                )}

                <tbody>
                    {materialMapping.map((ele, index) => {
                        const {material_name, supplier_name, quantity, material_unit, cost} = ele;

                        return (
                            <tr key={index}>
                                <td>{material_name}</td>
                                <td>{quantity}</td>
                                <td>{material_unit}</td>
                                <td>
                                    <div
                                        style={{
                                            color: '#9a9d9d',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            this.removeResourceMapping(ele);
                                        }}
                                    >
                                        <FontAwesome name="trash" />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    };
    render() {
        const formData = FormModel.getAll(this.state.formName);
        const {
            startDate,
            selectedMaterial,
            selectedSupplier,
            materialListOption,
            src,
            materialList,
            quantity,
            GRN_NO,
        } = this.state;
        const {supplierList = []} = this.props;
        console.log('props', this.props);

        return (
            <div>
                <ConfirmationModal
                    toggle={this.props.showAddEditMaterialModal}
                    modalHeader={'Material Entry'}
                    modalBody={
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <Row>
                                        <Col sm={12}>
                                            <span>Date</span>
                                        </Col>
                                        <Col sm={12}>
                                            <DatePicker selected={startDate} onChange={this.handleApply} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <React.Fragment>
                                    {UPDATE_MATERIAL_VEHICLE_DETAILS.map((props, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={getMandatoryIconWithCheck(props.label, props.mandatoryFlag)}
                                                placeholder={props.placeholder}
                                                id={props.id}
                                                errorKey={props.errorKey}
                                                errorString={props.errorString}
                                                pullRight={props.pullRight}
                                                inputSize={props.inputSize}
                                                labelSize={props.labelSize}
                                                type={props.type}
                                                tooltipInfo={props.tooltipInfo}
                                                tooltipText={props.tooltipText}
                                                {...this.formRelatedProps()}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                                {/* <React.Fragment>
                                    {UPDATE_GRN.map((props, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={props.label}
                                                placeholder={props.placeholder}
                                                id={this.state.GRN_NO}
                                                value={this.state.GRN_NO}
                                                pullRight={props.pullRight}
                                                inputSize={props.inputSize}
                                                labelSize={props.labelSize}
                                                type={props.type}
                                                tooltipInfo={props.tooltipInfo}
                                                tooltipText={props.tooltipText}
                                                {...this.formRelatedProps()}
                                            />
                                        );
                                    })}
                                </React.Fragment> */}
                                <React.Fragment>
                                    {UPDATE_GRN.map((props, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={getMandatoryIconWithCheck(
                                                    props.label,
                                                    (props.mandatoryFlag = false)
                                                )}
                                                placeholder={props.placeholder}
                                                id={props.id}
                                                value = {this.state}
                                                errorKey={props.errorKey}
                                                errorString={props.errorString}
                                                pullRight={props.pullRight}
                                                inputSize={props.inputSize}
                                                labelSize={props.labelSize}
                                                type={props.type}
                                                mandatoryFlag={false}
                                                tooltipInfo={props.tooltipInfo}
                                                tooltipText={props.tooltipText}
                                                handler={(value, id) => this.inputHandler(value, id)}

                                                // {...this.formRelatedProps()}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                               
                                <SelectField
                                    fieldSize={10}
                                    labelSize={12}
                                    pullRight={false}
                                    selectedValue={selectedSupplier}
                                    onChange={(newData) => {
                                        this.getMaterialData(newData);
                                    }}
                                    style={{styles: customStyles}}
                                    label={getMandatoryIconWithCheck('Recieved From', true)}
                                    mandatoryFlag={true}
                                    placeholder="Select Recieved From1"
                                    options={supplierList}
                                    // isDisabled={this.props.data.id ? true : false}
                                    borderRadius={2}
                                />
                                 <SelectField
                                    fieldSize={10}
                                    labelSize={12}
                                    pullRight={false}
                                    selectedValue={selectedSupplier}
                                    // onChange={(newData) => {
                                    //     this.getMaterialData(newData);
                                    // }}
                                    style={{styles: customStyles}}
                                    label={getMandatoryIconWithCheck('Refrence Number', true)}
                                    mandatoryFlag={true}
                                    placeholder="Select Refrence Number"
                                    // options={supplierList}
                                    isDisabled={this.props.data.id ? true : false}
                                    borderRadius={2}
                                />
                                <React.Fragment>
                                    {UPDATE_MATERIAL_CHALLAN_DETAILS.map((props, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={getMandatoryIconWithCheck(
                                                    props.label,
                                                    (props.mandatoryFlag = false)
                                                )}
                                                placeholder={props.placeholder}
                                                id={props.id}
                                                errorKey={props.errorKey}
                                                errorString={props.errorString}
                                                pullRight={props.pullRight}
                                                inputSize={props.inputSize}
                                                labelSize={props.labelSize}
                                                type={props.type}
                                                mandatoryFlag={false}
                                                tooltipInfo={props.tooltipInfo}
                                                tooltipText={props.tooltipText}
                                                {...this.formRelatedProps()}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                                <SelectField
                                    fieldSize={10}
                                    labelSize={12}
                                    pullRight={false}
                                    selectedValue={selectedMaterial}
                                    onChange={(newData) => this.setState({selectedMaterial: newData})}
                                    style={{styles: customStyles}}
                                    label={getMandatoryIconWithCheck('Received Material', true)}
                                    mandatoryFlag={true}
                                    isDisabled={!Object.keys(selectedSupplier).length}
                                    placeholder="Select Material Name"
                                    options={materialListOption}
                                    borderRadius={2}
                                />
                                <React.Fragment>
                                    {UPDATE_MATERIAL_QUANTITY_DETAILS.map((props, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={props.label}
                                                placeholder={props.placeholder}
                                                id={props.id}
                                                pullRight={props.pullRight}
                                                inputSize={props.inputSize}
                                                labelSize={props.labelSize}
                                                value={this.state}
                                                type={props.type}
                                                unitinfo={true}
                                                disabled={!Object.keys(selectedMaterial).length}
                                                unit={
                                                    typeof selectedMaterial.unit !== 'undefined'
                                                        ? selectedMaterial.unit
                                                        : ''
                                                }
                                                handler={(value, id) => this.inputHandler(value, id)}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                                <React.Fragment>
                                    <Button
                                        className="btn btn-primary mr-10 pull-right"
                                        disabled={!(parseInt(this.state.quantity) >= 1)}
                                        onClick={() => this.mappedMaterial()}
                                    >
                                        Apply
                                    </Button>
                                </React.Fragment>
                                <React.Fragment>{this.renderMappingTable()}</React.Fragment>
                                {/* <Row>
                                    <Col sm={10}>
                                        <div className="form-group files color">
                                            <label>Upload Your File </label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="file"
                                                onChange={(e) => this.onFileChangeHandler(e, 'image5')}
                                            />
                                        </div>
                                    </Col>
                                </Row> */}
                                <ImageEditor
                                    onAddTextOnImg={() => {}}
                                    src={src}
                                    imageHandler={this.imageEditHandlerHeader}
                                    showAddText={false}
                                />
                            </Col>
                        </Row>
                    }
                    confirmationHandler={() => this.props.addEditMaterialFunction()}
                ></ConfirmationModal>
            </div>
        );
    }
}
