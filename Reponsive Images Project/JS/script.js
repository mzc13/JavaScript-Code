const IMAGES = document.querySelectorAll("img");
const AVAILABLE_IMAGE_SIZES = [400, 800, 1200, 1600, 2000];
const IMAGE_DATA_TYPES = ["showcase", "reason", "feature", "story"];
const DATA_TYPES_SIZES = {
    showcase: "100vw",
    reason: "(max-width: 799px) 100vw, 372px",
    feature: "(max-width: 799px) 100vw, 558px",
    story: "(max-width: 799px) 100vw, 670px",
};

function ImageObject(imageElement){
    this.src = imageElement.getAttribute("src");
    this.arrayOfFileSizeVarieties = generateDifferentSizeNames(getImageNameFromUrl(this.src));
    this.type = imageElement.getAttribute("data-type");
}

function generateDifferentSizeNames(imageSource){

    // The imageSource array has the full source but the image name is the last value of the array
    let imageName = imageSource.pop();

    // This extracts the name of the image without the size and file extension
    let imagePrefix = imageName.split("-")[0];

    // This extracts the file extension from the image name
    let imageFileExtension = imageName.split(".").pop();

    // For loop goes through and creates the image url's for every image size
    let imageSourceWithSizesArray = [];
    for(var i = 0; i <AVAILABLE_IMAGE_SIZES.length; i++){

        // Need to create a copy of the image source array. At this point the image source array is missing the image
        // name because it was popped out earlier in the function. 
        let temporaryimageSource = imageSource.slice();

        // Push the new image name that includes the size to the temporary image source array
        temporaryimageSource.push(imagePrefix + "-" + AVAILABLE_IMAGE_SIZES[i] + "." + imageFileExtension);

        // Turn the image source array into an actual file path and push it to the array that contains all the sources
        imageSourceWithSizesArray.push(temporaryimageSource.join("/"));
    }
    return imageSourceWithSizesArray;
}

function getImageNameFromUrl(url){
    return url.split("/");
}

function createSrcset(imageObject){
    let srcsetValue = "";
    for(var i = 0; i < (AVAILABLE_IMAGE_SIZES.length - 1); i++){
        srcsetValue += imageObject.arrayOfFileSizeVarieties[i] + " " + AVAILABLE_IMAGE_SIZES[i] + "w,";
    }

    // The final srcset value is outside the array to make sure it doesn't end with a comma
    srcsetValue += imageObject.arrayOfFileSizeVarieties[i] + " " + AVAILABLE_IMAGE_SIZES[i] + "w";
    
    imageObject.srcset = srcsetValue;
}

function createSizes(imageObject){
    imageObject.sizes = DATA_TYPES_SIZES[imageObject.type];
}

for(var i = 0; i < IMAGES.length; i++){
    let imageObject = new ImageObject(IMAGES[i]);
    createSrcset(imageObject);
    createSizes(imageObject);
    IMAGES[i].setAttribute("srcset", imageObject.srcset);
    IMAGES[i].setAttribute("sizes", imageObject.sizes);
}
