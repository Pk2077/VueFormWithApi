<template>

    <div class="row row-mb-4" style="margin-left: 10px; margin-right: 10px">
        <div class="col-md-2">
            <h5 style="color: #0073aa !important">
                <b>Company Form</b>
            </h5>
        </div>

        <div class="col-md-4"></div>
        <div class="col-md-2"></div>
        <div class="col-md-4">
            <div class="nav navbar-nav navbar-right">
                <div style="text-align: right ">

                    <div :style="{ display: showEditBtn ? 'inline-block' : 'none' }"
                         class="btn toolbar_button default_padding_toolbar_button theme_button_color"
                         @click="NewForm()">
                        <div class="toolbar_button_image">
                            <span class="icon-new icon-font6"
                                  style="font-size: 18px"></span>
                        </div>
                        <div class="toolbar_button_text font-6">New</div>
                    </div>

                    <div :style="{ display: showOkBtn ? 'inline-block' : 'none' }"
                         class="btn toolbar_button default_padding_toolbar_button theme_button_color"
                         @click="submitForm">
                        <div class="toolbar_button_image">
                            <span class="icon-save icon-font6"
                                  style="font-size: 18px"></span>
                        </div>
                        <div class="toolbar_button_text font-6">Ok</div>
                    </div>

                    <div :style="{ display: showOkBtn ? 'inline-block' : 'none' }"
                         class="btn toolbar_button default_padding_toolbar_button theme_button_color"
                         @click="GoBack()">
                        <div class="toolbar_button_image">
                            <span class="icon-close icon-font6"
                                  style="font-size: 18px"></span>
                        </div>
                        <div class="toolbar_button_text font-6">Go To List</div>
                    </div>

                    <div :style="{ display: showEditBtn ? 'inline-block' : 'none' }"
                         class="btn toolbar_button default_padding_toolbar_button theme_button_color"
                         @click="editSelected()">
                        <div class="toolbar_button_image">
                            <span class="icon-edit icon-font6 ImagesinArabic"
                                  style="font-size: 18px"></span>
                        </div>
                        <div class="toolbar_button_text font-6">Edit</div>
                    </div>

                    <div :style="{ display: showEditBtn ? 'inline-block' : 'none' }"
                         class="btn toolbar_button default_padding_toolbar_button theme_button_color"
                         @click="deleteSelected()">
                        <div class="toolbar_button_image">
                            <span class="icon-delete icon-font6"
                                  style="font-size: 18px"></span>
                        </div>
                        <div class="toolbar_button_text font-6">Delete</div>
                    </div>

                    <div class="btn toolbar_button default_padding_toolbar_button theme_button_color"
                         @click="goToHomePage()">
                        <div class="toolbar_button_image">
                            <i class="icon-close icon-font6"
                               style="font-size: 18px"></i>
                        </div>
                        <div class="toolbar_button_text font-6">Home</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr style="margin: 0px 0px !important" />

    <div id="List" v-if="!showForm">
        <ListComponent :companies="companies"
                       :selectedcompanies="selectedCompanies"
                       @change="handleCompanyChange"
                       @update:selectedcompanies="updateSelectedCompanies" />
    </div>

    <form @submit.prevent="submitForm"
          class="form-group"
          :style="{ display: showForm ? 'block' : 'none', marginLeft: '10px' }">
        <input type="hidden" ref="Id" name="Id" />
        <div class="row row-mb-4">
            <div class="col-md-2">
                <label for="Name" class="form-label">Company Name</label>
            </div>

            <div class="col-md-4">
                <input type="text" ref="Name" name="Name" class="form-control" />
            </div>
            <div class="col-md-2">
                <label for="Code" class="form-label">Company Code</label>
            </div>
            <div class="col-md-4">
                <input type="text" ref="Code" name="Code" class="form-control" />
            </div>
        </div>

        <div class="row row-mb-4">
            <div class="col-md-2">
                <label for="Contact" class="form-label">Contact Person</label>
            </div>

            <div class="col-md-4">
                <input type="text" ref="Contact" name="Contact" class="form-control" />
            </div>
            <div class="col-md-2">
                <label for="Phone" class="form-label">Mobile No :</label>
            </div>
            <div class="col-md-4">
                <input type="text" ref="Phone" name="Phone" class="form-control" />
            </div>
        </div>

        <div class="row row-mb-4">
            <div class="col-md-2">
                <label for="Add1" class="form-label">Add 1</label>
            </div>

            <div class="col-md-4">
                <input type="text" ref="Add1" name="Add1" class="form-control" />
            </div>
            <div class="col-md-2">
                <label for="Add2" class="form-label">Add 2</label>
            </div>
            <div class="col-md-4">
                <input type="text" ref="Add2" name="Add2" class="form-control" />
            </div>
        </div>

        <div class="row row-mb-4">
            <div class="col-md-2">
                <label for="City" class="form-label">City</label>
            </div>

            <div class="col-md-4">
                <input type="text" ref="City" name="City" class="form-control" />
            </div>
            <div class="col-md-2">
                <label for="State" class="form-label">State</label>
            </div>
            <div class="col-md-4">
                <input type="text" ref="State" name="State" class="form-control" />
            </div>
        </div>
        <div class="row row-mb-4">
            <div class="col-md-2">
                <label for="Pin" class="form-label">Pin Code</label>
            </div>

            <div class="col-md-4">
                <input type="text" ref="Pin" name="Pin" class="form-control" />
            </div>
        </div>
    </form>

</template>

<style scoped>
    body {
        margin: 30px 20px;
    }

    form {
        max-width: 80%;
    }

    .form-control {
        border-radius: 0px;
    }

    .form-select {
        border-radius: 0px;
    }

    .row {
        margin-top: 10px;
    }

    body {
        color: #52656b;
        margin-left: 20px;
        margin-right: 20px;
    }

    h1,
    .h1,
    h2,
    .h2,
    h3,
    .h3 {
        margin-bottom: 30px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        color: #3b4b50;
    }

    h2,
    .h2 {
        font-size: 25px;
    }

    .body-content {
        padding-top: 20px;
    }

    .navbar-inverse {
        background-color: #0179b6;
        border-color: #0179b6;
        color: #fff;
    }

        .navbar-inverse .navbar-nav > li > a {
            color: #fff;
            transition: border-bottom ease-in-out 0.15s;
        }

            .navbar-inverse .navbar-nav > li > a:hover,
            .navbar-inverse .navbar-nav > li > a:focus {
                color: #fff;
            }

        .navbar-inverse .navbar-brand {
            color: #fff;
        }

            .navbar-inverse .navbar-brand:hover,
            .navbar-inverse .navbar-brand:focus {
                color: #860d32;
                background-color: transparent;
            }

    a,
    .btn-link {
        color: #09a7e4;
    }

    .btn {
        border-radius: 0px;
        text-transform: none;
        font-weight: bold;
        font-size: 12px;
    }

    .btn-primary {
        border: 0;
        padding: 8px 20px;
    }

    .pagination > .active > a,
    .pagination > .active > span,
    .pagination > .active > a:hover,
    .pagination > .active > span:hover,
    .pagination > .active > a:focus,
    .pagination > .active > span:focus {
        color: #ffffff;
        background-color: #52656b;
        border-color: #52656b;
    }

    .pagination > li > a,
    .pager > li > a,
    .pagination > li > span,
    .pager > li > span {
        text-transform: none;
    }

    table a:not(.btn),
    .table a:not(.btn) {
        text-decoration: none;
    }

    .form-control {
        height: 41px;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-transition: border-color ease-in-out 0.1s, box-shadow ease-in-out 0.15s;
        -moz-transition: border-color ease-in-out 0.1s, box-shadow ease-in-out 0.15s;
        -ms-transition: border-color ease-in-out 0.1s, box-shadow ease-in-out 0.15s;
        -o-transition: border-color ease-in-out 0.1s, box-shadow ease-in-out 0.15s;
        transition: border-color ease-in-out 0.1s, box-shadow ease-in-out 0.15s;
        border-radius: 0px;
    }

    .form-select {
        border-color: #2c76c0;
        border-radius: 0px;
        transition: border-color ease-in-out 0.1s, box-shadow ease-in-out 0.15s;
    }

        .form-select:focus {
            border-color: red;
        }

    .myth {
        background-color: #0179b6 !important;
        color: white !important;
    }

    .custom-validation-summary ul {
        list-style-type: none;
        color: red;
        padding: 0;
    }

    .bg-warning {
        background-color: #0179b6 !important;
    }

    .btn-outline-secondarymine {
        --bs-btn-color: #0179b6 !important;
        --bs-btn-border-color: #0179b6 !important;
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #0179b6 !important;
        --bs-btn-hover-border-color: #0179b6 !important;
        --bs-btn-focus-shadow-rgb: 108, 117, 125;
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #0179b6 !important;
        --bs-btn-active-border-color: #0179b6;
        --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        --bs-btn-disabled-color: #0179b6 !important;
        --bs-btn-disabled-bg: transparent;
        --bs-btn-disabled-border-color: #0179b6 !important;
        --bs-gradient: none;
    }

    form input {
        border-left-color: rgba(252, 70, 70, 0.63) !important;
        border-left-width: 2px !important;
        height: 26px !important;
    }

    form {
        font-family: "OpenSans-Regular" !important;
        font-size: 15px !important;
        border-color: black !important;
    }
</style>

<script>
    import axios from "axios";
    import Focus8WAPI from '/Praveen/VuePros/newform/newform/src/assets/scripts/FClient.js';
    import ListComponent from "/Praveen/VuePros/newform/newform/src/components/ListComponent.vue";

    export default {
        components: {
            ListComponent
        },
        data() {
            return {
                showForm: false,
                showOkBtn: false,
                showEditBtn:true,
                companies: [], // Array to hold company data
                selectedCompanies: [], // Array to hold selected company IDs
                selectAll: false // Boolean to track select all checkbox state
            };
        },
        created() {
            axios.get("http://localhost:8880/api/company")
                .then(response => {
                    this.companies = response.data;
                })
                .catch(error => {
                    console.error("Error fetching companies:", error);
                });
        },
        methods: {
            updateSelectedCompanies(selectedIds) {
                if (selectedIds.length == 0) {
                    this.selectedCompanies = [];
                    return;
                }
                this.selectedCompanies = [];
                this.selectedCompanies = selectedIds;
            },
            handleCompanyChange(companyId, isSelected) {
                if (isSelected == undefined)
                    return;
                if (isSelected) {
                    this.selectedCompanies.push(companyId);
                } else {
                    const index = this.selectedCompanies.indexOf(companyId);
                    this.selectedCompanies.splice(index, 1);
                }
            },
            async submitForm() {
                console.log("submitted");
                const data = {
                    Id: this.$refs.Id.value,
                    Name: this.$refs.Name.value,
                    Code: this.$refs.Code.value,
                    Contact: this.$refs.Contact.value,
                    Phone: this.$refs.Phone.value,
                    Add1: this.$refs.Add1.value,
                    Add2: this.$refs.Add2.value,
                    City: this.$refs.City.value,
                    State: this.$refs.State.value,
                    Pin: this.$refs.Pin.value,
                };
                if (this.$refs.Id.value > 0) {
                    try {
                        const response = await axios.post(
                            `http://localhost:8880/api/company/${this.$refs.Id.value}`,
                            data
                        ).then(res => location.reload());
                        console.log("Response:", response.data);
                    } catch (error) {
                        console.error("Error:", error);
                    }
                } else {
                    try {
                        const response = await axios.post(
                            "http://localhost:8880/api/company",
                            data
                        ).then(
                            res => location.reload()
                        );
                        console.log("Response:", response.data);
                    } catch (error) {
                        console.error("Error:", error);
                        alert(error.response.data.title)
                    }
                }
            },
            editSelected()
            {
                if (this.selectedCompanies.length > 1) {
                    alert('Please select only one company to edit.');
                    return;
                }
                const selectedCompanyId = this.selectedCompanies[0];

                if (!selectedCompanyId) {
                    alert('Please select a company to edit.');
                    return;
                }
                
                axios.get(`http://localhost:8880/api/company/${selectedCompanyId}`)
                    .then(response => {
                        const company = response.data;

                        this.$refs.Id.value = company.id;
                        this.$refs.Name.value = company.name;
                        this.$refs.Code.value = company.code;
                        this.$refs.Contact.value = company.contact;
                        this.$refs.Phone.value = company.phone;
                        this.$refs.Add1.value = company.add1;
                        this.$refs.Add2.value = company.add2;
                        this.$refs.City.value = company.city;
                        this.$refs.State.value = company.state;
                        this.$refs.Pin.value = company.pin;

                        this.showForm = true;
                        this.showOkBtn = true;
                        this.showEditBtn = false;
                    })
                    .catch(error => {
                        console.error('Error fetching company details:', error);
                        alert('Failed to fetch company details. Please try again.');
                    });
            },
            deleteSelected() {
                if (this.selectedCompanies.length < 1) {
                    alert('Please select at least one company to delete.');
                    return;
                }

                this.selectedCompanies.forEach(companyId => {
                    axios.post(`http://localhost:8880/api/company/remove/${companyId}`)
                        .catch(error => {
                            console.error('Error deleting company ', error);
                            alert('Error deleting company. Please try again.');
                        });
                });
                location.reload();
            },
            GoBack() {
                this.showForm = false;
                this.showOkBtn = false;
                this.showEditBtn = true;
                location.reload();
            },
            NewForm() {
                        this.$refs.Id.value = 0;

                        this.showForm = true;
                        this.showOkBtn = true;
                        this.showEditBtn = false;
            },
            goToHomePage() {
                Focus8WAPI.gotoHomePage();
            }
          },
    };
</script>
