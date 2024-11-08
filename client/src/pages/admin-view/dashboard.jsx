import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList, loading, error } = useSelector((state) => state.commonFeature); // Added loading and error state

  console.log(uploadedImageUrl, "uploadedImageUrl");

  async function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return; // Ensure there's an image to upload

    setImageLoadingState(true); // Set loading state
    try {
      const data = await dispatch(addFeatureImage(uploadedImageUrl));
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    } catch (err) {
      console.error("Error uploading feature image:", err); // Log error
    } finally {
      setImageLoadingState(false); // Reset loading state
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full" disabled={imageLoadingState}>
        {imageLoadingState ? "Uploading..." : "Upload"}
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {loading ? (
          <p>Loading images...</p> // Loading message
        ) : error ? (
          <p>Error loading images: {error}</p> // Error message
        ) : featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <div key={featureImgItem.id} className="relative"> {/* Use a unique key */}
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
                alt={`Feature image ${featureImgItem.id}`} // Alt text for accessibility
              />
            </div>
          ))
        ) : (
          <p>No images found.</p> // Message when no images are available
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
