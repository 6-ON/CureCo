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
    const rows = $('table tbody');
    $.ajax({
        url: "/api/products/get",
        data: options,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            rows.empty()
            $('#loading-spinner').show()
        },
        success: function (res) {
            rows.empty()
            $('#btn-delete').prop('disabled',true)
            $('#loading-spinner').hide()
            if (!res.length) {
                rows.append(noResults())
                return
            }
            for (const product of res) {
                rows.append(productRow(product))
            }
        },
        error: function (error) {
            console.log(error)
        }
    })

}


$(function () {
    const tableBody = $('table tbody')
    //loading products
    loadProducts()
    // toggle all table rows
    $('#checkbox-all-search').on('click', function () {
        $('table tbody input[type="checkbox"]').prop('checked', $(this).is(':checked'))
    })


    //searching and updating datatable
    $('#topbar-search').bind('keyup', function () {
        loadProducts({term: $(this).val()})
    })

    tableBody.on('change', 'input[type="checkbox"]', function () {
        const btnDelete = $('#btn-delete')
        if ($('table tbody input[type="checkbox"]:checked').length === 0) {
            btnDelete.prop('disabled',true)
        }else{
            btnDelete.prop('disabled',false)
        }
    })
    // edit button click
    tableBody.on('click', 'button[data-action="edit"]', function () {
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

    $('#delete-confirm-btn').on('click', function () {
        const dataToSend = new FormData()
        $('table tbody input[type="checkbox"]:checked').map(function () {
            if (!isNaN($(this).val()))
                dataToSend.append('products[]', $(this).val())
        })
        console.log(dataToSend)
        if (!dataToSend.has('products[]')) {
            Toast.fire({
                icon: 'error',
                title: 'No product selected'
            })
            $('#deleteModal').click()
            return
        }
        $.ajax({
            url: '/api/products/delete',
            type: 'POST',
            dataType: 'json',
            data: dataToSend,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                console.log(res)
                Toast.fire({
                    icon: res.type,
                    title: res.content
                })
                $('#deleteModal').click()
                loadProducts()
            },
            error: function (error) {
                console.error(error)
            }
        })
    })

})