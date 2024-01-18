<template>
    <!-- {{ this.categories }} -->
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3"> {{category.categoryName}}</h4>
                <h5 style="font-weight: 300; color: #686868"> {{msg}} </h5>
            </div>
        </div>

        <div class="row">
            <div v-for="product of products" :key="product.id"
                 class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
                <ProductBox :product="product" />
            </div>
        </div>
    </div>
</template>
<script>
    import ProductBox from "../../components/ProductBox";
    import axios from "axios"; 
    export default {
        components: {ProductBox},
        data() {
            return {
                id: null,
                category: {},
                msg: '',
                products:[]
            }
        },
        props: ["baseURL","categories"],
        methods:{
            getCategory(){
                this.id = this.$route.params.id;
                axios.get(this.baseURL+"category/"+this.id)
                    .then(res=>{
                        this.category = res.data
                    })
                    .catch(err=>console.log(err))
            },
            getProducts(){
                this.id = this.$route.params.id;
                axios.get(this.baseURL+"product/category/"+this.id)
                    .then(res=>{
                        this.products = res.data
                        console.log(this.products)
                    })
                    .catch(err=>console.log(err))
            }
        },
        mounted() {
            this.getCategory()
            this.getProducts()
        }
    }
</script>