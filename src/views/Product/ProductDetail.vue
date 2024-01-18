<template>
    <div class="container">
        <div class="row pt-5">
            <!--            Leave some empty space in left-->
            <div class="col-md-1">
            </div>
            <!--                Display the image in left side-->
            <div class="col-md-4 col-12">
                <img :src="product.imageURL" :alt="product.name" class="img-fluid">
            </div>
            <!-- Display product name category name and product description-->
            <div class="col-md-6 col-12 pt-3 pt-md-0">
                <h4>{{product.name}}</h4>

                <h6 class="category font-italic">{{category}}</h6>

                <p><span class="font-weight-bold">Description: -</span> <br>{{product.description}}</p>

                <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Quantity</span>
            </div>
            <input class="form-control" type="number" v-bind:value="quantity" />
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button
              type="button"
              id="add-to-cart-button"
              class="btn"
              @click="addToCart(this.id)"
            >
              Add to Cart
              <ion-icon name="cart-outline" v-pre></ion-icon>
            </button>
          </div>
        </div>

                <!-- Dummy placeholder features -->
                <div class="features pt-3">
                    <h5><strong>Features</strong></h5>
                    <ul>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Officia quas, officiis eius magni error magnam voluptatem</li>
                        <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
                        <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
                        <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
                    </ul>
                </div>


                <button
          id="wishlist-button"
          class="btn mr-3 p-1 py-0"
          :class="{ product_added_wishlist: isAddedToWishlist }"
          @click="addToWishList(this.id)"
        >
          {{ wishlistString }}
        </button>
            </div>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
    export default {
        name: "ProductDetail",
        data(){
            return {
                product : {},
                category : "",
                isAddedToWishlist: false,
                wishlistString: "Add to wishlist",
                id : null,
                quantity: 1
            }
        },
        props : ["baseURL","products", "categories"],
        methods:{
            addToWishList(productId) {
                if(this.isAddedToWishlist == true){
                    axios.delete(`${this.baseURL}wishlist/`+this.id).then((res)=>{
                        this.isAddedToWishlist = false;
                        this.wishlistString = "Add to WishList";
                        console.log(res)
                    }).catch(err=>console.log(err))
                }else{
                axios
                    .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
                    id: productId,
                    })
                    .then(
                    (response) => {
                        console.log(response.status)
                        if (response.status == 201) {
                            this.isAddedToWishlist = true;
                            this.wishlistString = "Added to WishList";
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                    );
                }
                },
    addToCart(productId) {
      if (!this.token) {
        swal({
          text: "Please log in first!",
          icon: "error",
        });
        return;
      }
      axios
        .post(`${this.baseURL}cart/add?token=${this.token}`, {
          productId: productId,
          quantity: this.quantity,
        })
        .then(
          (response) => {
            if (response.status == 201) {
                console.log(response)
              swal({
                text: "Product Added to the cart!",
                icon: "success",
                closeOnClickOutside: false,
              });
              // refresh nav bar
              this.$emit("fetchData");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },

            getProduct(){
                this.id = this.$route.params.id;
                axios.get(this.baseURL+'product/'+ this.id)
                    .then(res=>{
                        this.product = res.data
                        this.category = this.product.category.categoryName
                        console.log(this.product.category.categoryName)
                    })
                    .catch(err=> console.log(err))
            }
        },
        mounted() {
            this.getProduct()
            // this.id = this.$route.params.id;
            // this.product = this.products.find(product => product.id == this.id);
            // this.category = this.categories.find(category => category.id == this.product.category_id);
            this.token = localStorage.getItem("token");
        }
    }
</script>

<style>
.category {
  font-weight: 400;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

#add-to-cart-button {
  background-color: #febd69;
}

#wishlist-button {
  background-color: #b9b9b9;
  border-radius: 0;
}

#show-cart-button {
  background-color: #131921;
  color: white;
  border-radius: 0;
}
</style>