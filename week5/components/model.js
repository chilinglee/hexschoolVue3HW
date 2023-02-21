export default {
    props: ['tempProd', 'addToCart'],
    data() {
        return {
            myModal: '',
            count: 1
        }
    },
    template: `<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                    <span>{{ tempProd?.category }}</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <img class="img-fluid" :src="tempProd?.imageUrl" alt="">
                    </div>
                    <div class="col-sm-6">
                        <span class="badge bg-primary rounded-pill">{{ tempProd?.title }}</span>
                        <p>商品描述：{{ tempProd?.description }}</p>
                        <p>商品內容：{{ tempProd?.content }}</p>
                        <div class="h5">{{ tempProd?.price }} 元</div>
                        <del class="h6">原價 {{ tempProd?.origin_price }} 元</del>
                        <div class="h5">現在只要 {{ tempProd?.price }} 元</div>
                        <div>
                            <div class="input-group">
                                <input type="number" class="form-control" min="1" v-model="count">
                                <button type="button" class="btn btn-primary" @click="addToCart(tempProd.id, count)">加入購物車</button>
                            </div>
                        </div>
                    </div>
                    <!-- col-sm-6 end -->
                </div>
            </div>
        </div>
    </div>
</div>`,
    methods: {
        showModal() {
            //console.log(this.myModal);
            this.myModal.show();
        },
        hideModal() {
            this.myModal.hide();
        }
    },
    mounted() {
        this.myModal = new bootstrap.Modal(this.$refs.modal);
    }
}