
function noResults() {
    return '<tr><td class="text-center text-2xl" colspan="6">No Result</td></tr>'
}

function productRow({id, name, price, quantity, image}) {
    return `<tr data-prod="${id}" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input value="${id}" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </div>
            </td>
            <td class="p-4">
                <img class="h-20" src="img/products/${image}?generated_at=${new Date().getTime()}" alt="${name}">
            </td>
            <th scope="row" class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                ${name}
            </th>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${quantity}
            </td>
            <td class="px-6 py-4">
                $${price}
            </td>
            <td class="px-6 py-4">
                <button data-action="edit" data-modal-target="updateProductModal" data-modal-show="updateProductModal" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline" value="${id}">Edit</button>
            </td>
        </tr>`
}
