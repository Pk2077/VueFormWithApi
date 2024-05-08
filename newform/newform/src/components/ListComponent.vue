<template>
    <div>
        <h5>Companies</h5>

        <div class="table-responsive">
            <table id="companies" class="table table-bordered table-hover">
                <thead>
                    <tr >
                        <td class="mytd">
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"> Select
                        </td>
                        <td class="mytd">Id</td>
                        <td class="mytd">Name</td>
                        <td class="mytd">Code</td>
                        <td class="mytd">Contact Person</td>
                        <td class="mytd">City</td>
                        <td class="mytd">State</td>
                        <td class="mytd">Pin</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="company in companies" :key="company.id" >
                        <td><input type="checkbox" :checked="isSelected(company.id)" @click="toggleSelection(company.id)"></td>
                        <td>{{ company.id }}</td>
                        <td>{{ company.name }}</td>
                        <td>{{ company.code }}</td>
                        <td>{{ company.contact }}</td>
                        <td>{{ company.city }}</td>
                        <td>{{ company.state }}</td> <!-- Fixed typo here -->
                        <td>{{ company.pin }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            companies: {
                type: Array,
                required: true
            },
            selectedcompanies: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                selectAll: false
            };
        },
        methods: {
            toggleSelection(companyId) {
                const selected = this.isSelected(companyId);

                if (!selected) {
                    this.$emit('change', companyId, true);
                } else {
                    this.$emit('change', companyId, false);
                }
            },
            isSelected(companyId) {
                return this.selectedcompanies.includes(companyId);
            },
            toggleSelectAll() {
                if (this.selectAll) {
                    const selectedIds = this.companies.map(company => company.id);
                    this.$emit('update:selectedcompanies', selectedIds);
                } else {
                    this.$emit('update:selectedcompanies', []);
                }
            }
        }
    };
</script>

<style scoped>
    tr td {
        padding: 0px 0px;
        height: 26px !important;
        max-height: 30px !important;
        padding-left:8px;
    }

    .mytd {
        background-color: #0179b6;
        color: white;
    }
</style>
