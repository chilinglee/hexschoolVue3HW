export default {
    props: ['products', 'currentPage', 'getProducts'],
    template: `<div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="i in Math.ceil(products.length/10)" :key="i"
                :class="[currentPage==i?'active':'']" @click="getProducts(i)">
                <a class="page-link">{{i}}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</div>`
}