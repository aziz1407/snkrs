console.log("Products frontend javascript file");

$(function () {
    $(".product-collection").on("change", () => {
        const selectedValue = $(".product-collection").val();
        if (["NIKE", "ADIDAS", "PUMA", "NEW BALANCE", "MIX"].includes(selectedValue)) {
            $("#product-size").show();
        }
    });

    $("#cancel-btn").on("click", (event) => {
        event.preventDefault();
        // Reset input fields
        $(".prod-container")[0].reset();
        
        // Clear image previews
        $(".media-frame img").attr("src", "");
    });

    $(".new-product-status").on("change", async function(e) {
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();

        try {
            const response = await axios.post(`/admin/product/${id}`, { productStatus });
            console.log("response:", response);
            const result = response.data;
            if (result.data) {
                $(".new-product-status").blur();
            } else alert("Product update failed!");
        } catch (err) {
            console.log(err);
            alert("Product update failed!");
        }
    });
});

function validateForm() {
    const productName = $(".product-name").val(),
        productPrice = $(".product-price").val(),
        productLeftCount = $(".product-left-count").val(),
        productCollection = $(".product-collection").val(),
        productDesc = $(".product-desc").val(),
        productStatus = $(".product-status").val();

    if (productName === "" || productPrice === "" || productLeftCount === "" || productCollection === "" || productDesc === "" || productStatus === "") {
        alert("Please insert all required inputs");
        return false;
    } else return true;
}

function previewFileHandler(input, order) {
    const file = $(input).get(0).files[0]; // Get the first file from the input
    const fileType = file?.type;
    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    
    if (!validImageTypes.includes(fileType)) {
        alert("Please insert only jpeg, jpg, png");
    } else {
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                $(`#image-section-${order}`).attr("src", reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
}