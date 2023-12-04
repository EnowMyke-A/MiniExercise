

   function LoadData(){
    fetch('data.json')
    .then( response => response.json())
    .then(data =>{
        const JsonData = data;
        JsonData.forEach(product => {
            createElement(product.images[0], product.name, product.brand + ' ' + product.category, product.price);
        });
    })

    .catch(error =>{
        console.log(error);
    })
}



function createElement(img, name, desc, price){
    const mainContainer = $('.product__container');
    var productCard = $('<div>').addClass('product__card');
    var image = $('<img>').attr('src', img).attr('alt', 'product-image');
    var productName = $('<span>').addClass('product__name').text(name);
    var description = $('<span>').addClass('description').text(desc);
    var productPrice = $('<span>').addClass('product__price').text('$ '+ price);
    var button = $('<button>').addClass('cart__button').text('Add to Cart').append($('<i>').addClass('bx bx-cart-alt'));

    const imageCart = img;
    const nameCart = name;
    const priceCart = price;
    button.on('click', function(){
        alert('Product added to cart');
        createCartItem(imageCart, nameCart, priceCart);
        $('.cart__container').removeClass('text__centered');
        const empty = $('.empty__cart').eq(0);

        if($('.cart__item').length > 0) {
            empty.css('display', 'none');
        };
    })

    productCard.append(image, productName, description, productPrice, button);
    mainContainer.append(productCard)
}

function createCartItem(img, name, price){
    const mainContainer = $('.cart__container');
    var cartItem = $('<div>').addClass('cart__item');
    var image = $('<img>').attr('src', img);
    var subContainer = $('<div>').addClass('cart__name__remove');
    var productPrice = $('<span>').addClass('cart__item__price').text('$ ' + price);
    var productName = $('<span>').addClass('cart__item__name').text(name); 
    var remove = $('<span>').addClass('bx bx-trash remove');

    remove.on('click', function(){
        ($(this).parent()).parent().remove();
        indicateEmpty();
    })

    subContainer.append(productPrice, productName, remove);
    cartItem.append(image, subContainer);
    mainContainer.append(cartItem);

}

function indicateEmpty(){
    const cartContainer = $('.cart__container').eq(0);
    const cartItems = $('.cart__item');
    const empty = $('.empty__cart').eq(0);

    if(cartItems.length==0){
        cartContainer.addClass('text__centered');
        empty.css('display', 'inline-block');
    }

    else{
        cartContainer.removeClass('text__centered');
    }
}


function setUpImages(){
    var smallImages = $('.small__image');
    var LargeImage = $('.large__image').eq(0);

    for(let i=0; i<smallImages.length; i++){
        smallImages.eq(i).on('click', function(){
            smallImages.removeClass('active');
            LargeImage.attr('src', $(this).attr('src'));
            $(this).addClass('active');
        })
    }
}



$(document).ready(function(){
    LoadData();
    indicateEmpty();
    setUpImages();
 })