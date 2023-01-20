const errorStyle = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


function loadProducts(options = {}) {
    $('table tbody').empty()
    $('#loading-spinner').show()
    $.ajax({
        url: "/api/products/get",
        data: options,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            $('#loading-spinner').hide()
            if (!res.length) {
                $('table tbody').append(noResults())
                return
            }
            for (const product of res) {
                $('table tbody').append(productRow(product))
            }
        },
        error: function (error) {
            console.log(error)
        }
    })

}


$(function () {
    //loading products
    loadProducts()
    // toggle all table rows
    $('#checkbox-all-search').on('click', function () {
        $('table tbody input[type="checkbox"]').prop('checked', $(this).is(':checked'))
    })


    //searching and updating datatable
    $('#topbar-search').bind('keyup',  async function () {
           await loadProducts({term: $(this).val()})
    })

    // edit button click
    $('table tbody').on('click', 'button[data-action="edit"]', function () {
        const modalProduct = {
            name: $('#name-edit'),
            price: $('#price-edit'),
            quantity: $('#quantity-edit'),
        }
        $('#edit-hidden-trigger').click()
        const fields = $('#update-form input,#update-form button')
        fields.val('')

        $('#id-edit').val($(this).val())

        $.ajax({
            url: '/api/products/get',
            data: {id: $(this).val()},
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                fields
                    .prop('disabled', true)
                    .addClass('cursor-not-allowed')
            },
            success: function (product) {
                fields
                    .prop('disabled', false)
                    .removeClass('cursor-not-allowed')

                modalProduct.name.val(product.name)
                modalProduct.price.val(product.price)
                modalProduct.quantity.val(product.quantity)
            },
            error: function (e) {
                console.error(e)
            }
        })

    })
    // form on submit event
    $('#update-form').on('submit', function (event) {
        event.preventDefault()

        const fields = $('#update-form input,#update-form button')
        const formData = new FormData(this)
        //validate image
        if (formData.get('image').size === 0) {
            formData.delete('image')
        }
        console.log(formData)

        $.ajax({
            url: '/api/products/update',
            data: formData,
            type: 'POST',
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                fields
                    .prop('disabled', true)
                    .addClass('cursor-not-allowed')
            },
            success: function (res) {
                fields
                    .prop('disabled', false)
                    .removeClass('cursor-not-allowed')

                Toast.fire({
                    icon: res.type,
                    title: res.content
                })
                $('#updateProductModal').click()
                loadProducts()

            },
            error: function (e) {
                console.error(e)
            }
        })
    })
    $('#create-form').on('submit', function (event) {
        event.preventDefault();
        const fields = $('#create-form input,#create-form button')
        const formData = new FormData(this)
        //validate image
        if (formData.get('image').size === 0) {
            return
        }
        $.ajax({
            url: '/api/products/create',
            method: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                fields
                    .prop('disabled', true)
                    .addClass('cursor-not-allowed')
            },
            success: function (res) {
                console.info(res)
                fields
                    .prop('disabled', false)
                    .removeClass('cursor-not-allowed')
                $('#createProductModal').click()
                Toast.fire({
                    icon: res.type,
                    title: res.content
                })
                loadProducts()
            },
            error: function (error) {
                console.error(error)
            }
        })
    })


})