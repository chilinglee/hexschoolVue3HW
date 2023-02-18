export default {
    data() {
        return {
            newImageUrl: ''
        }
    },
    props: ['tempProd', 'saveData'],
    template:
        `<div class="modal fade" id="editModal" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="container">
                        <div class="row">
                            <div class="col-5">
                                <label for="imageUrl" class="form-label">主要圖片</label>
                                <input type="text" class="form-control mb-2" id="imageUrl"
                                    v-model.lazy="tempProd.imageUrl">
                                <img v-if="tempProd.imageUrl" :src="tempProd.imageUrl" alt="tempProd.title">
                                <label for="imagesUrl" class="form-label">其他圖片</label>
                                <input type="text" class="form-control" id="imagesUrl"
                                    v-model.lazy="newImageUrl">
                                <button class="btn btn-primary my-2" type="button"
                                    @click="addNewImgUrl">新增圖片</button>
                                <img class="my-2" v-for="url in tempProd.imagesUrl" :src="url"
                                    alt="tempProd.title" :key="url">
                            </div>
                            <div class="col-7">
                                <div class="row mb-3">
                                    <label for="title" class="col-sm-2 col-form-label">品名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="title"
                                            v-model="tempProd.title">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="category" class="col-sm-2 col-form-label">類別</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="category" name="category"
                                            v-model.trim="tempProd.category">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="origin_price" class="col-sm-2 col-form-label">原價</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" id="origin_price" name="origin_price"
                                            type="number" v-model.number="tempProd.origin_price" min="0" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="price" class="col-sm-2 col-form-label">價格</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" id="price" name="price" type="number"
                                            v-model.number="tempProd.price" min="0" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="unit" class="col-sm-2 col-form-label">單位</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" id="unit" name="unit" type="text"
                                            v-model.trim="tempProd.unit" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="content" class="col-sm-2 col-form-label">内容</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" id="content" name="content"
                                            v-model="tempProd.content"></textarea>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="description" class="col-sm-2 col-form-label">説明</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" id="description" name="description"
                                            v-model="tempProd.description"></textarea>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="is_enabled" class="col-sm-2 col-form-label">狀態</label>
                                    <div class="col-sm-10">
                                        <div class="form-check form-check-inline"
                                            style="padding-top: calc(.375rem + 1px);padding-bottom: calc(.375rem + 1px);">
                                            <input class="form-check-input" type="radio" name="is_enabled"
                                                id="is_enabled1" value="1" v-model.number="tempProd.is_enabled">
                                            <label class="form-check-label" for="is_enabled1">啓用</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="is_enabled"
                                                id="is_enabled0" value="0" v-model.number="tempProd.is_enabled">
                                            <label class="form-check-label" for="is_enabled0">未啓用</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="saveData">Save changes</button>
            </div>
        </div>
    </div>
        </div>`,
    methods: {
        addNewImgUrl() {
            this.$emit('addNewImgUrl', this.newImageUrl);
            this.newImageUrl = '';
        }
    }
}