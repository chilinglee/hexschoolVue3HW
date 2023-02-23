import cartStore from '../store/cartStore.js';
const { mapState, mapActions } = Pinia;
export default {
    template: `
    <div v-if="cartDetails.carts.length">
    <div class="text-end">
                    <button class="btn btn-outline-danger" type="button">清空購物車</button>
                </div>
                <table class="table align-middle">
                    <thead>
                        <tr>
                            <th></th>
                            <th>品名</th>
                            <th style="width: 150px">數量/單位</th>
                            <th class="text-end">單價</th>
                            <th class="text-end">小計</th>
                        </tr>
                    </thead>
                    <tbody><tr v-for="item in cartDetails.carts">
    <td>
        <button type="button" class="btn btn-outline-danger btn-sm" >
            <i class="fas fa-spinner fa-pulse"></i>
            x
        </button>
    </td>
    <td>
        {{ item.curProd?.title }}
        <div class="text-success">
            已套用優惠券
        </div>
    </td>
    <td>
        <div class="input-group input-group-sm">
            <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" :value="item.qty" @change="(event) => changeQty(event, item.prodId)">
                <span class="input-group-text" id="basic-addon2">{{ item.curProd?.unit }}</span>
            </div>
        </div>
    </td>
    <td class="text-end">
        <small class="text-success">折扣價：</small>
        {{ item.curProd.price }}
    </td>
    <td class="text-end">
        {{ item.subtotal }}
    </td>
</tr></tbody>
<tfoot>
    <tr>
        <td colspan="4" class="text-end">總計</td>
        <td class="text-end">{{ cartDetails.origin_total}}</td>
    </tr>
    <tr>
        <td colspan="4" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cartDetails.total }}</td>
    </tr>
</tfoot>
</table>
</div>
<div v-else>購物車無商品</div>`,
    computed: {
        ...mapState(cartStore, ['cartDetails'])
    },
    methods: {
        ...mapActions(cartStore, ['changeQty'])
    }
}