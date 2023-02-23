const { defineStore } = Pinia;
export default defineStore('cartStore', {
    state: () => ({
        cartList: [],
        products: []
    }),
    actions: {
        addToCart(prodId, qty = 1) {
            const currentCart = this.cartList.find(x => x.prodId === prodId);
            if (currentCart) {
                currentCart.qty += qty;
            } else {
                this.cartList.push({
                    id: new Date().getTime(),
                    prodId,
                    qty
                });
            }
        },
        changeQty(event, id) {
            const curCart = this.cartList.find(x => x.prodId === id);
            curCart.qty = event.target.value * 1;
        }
    },
    getters: {
        cartDetails: ({ cartList, products }) => {
            const carts = cartList.map((item) => {
                let curProd = products?.find(x => x.id === item.prodId);
                return {
                    ...item,
                    curProd,
                    subtotal: curProd.price * item.qty,
                    origin_subtotal: curProd.origin_price * item.qty
                }
            });

            let total = carts.reduce((a, b) => a + b.subtotal, 0);
            let origin_total = carts.reduce((a, b) => a + b.origin_subtotal, 0);

            return {
                carts,
                total,
                origin_total
            }
        }
    }
})