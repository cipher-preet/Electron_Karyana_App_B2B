import { useEffect, useState } from "react";
import Banners from "../Components/Banners";
import Carousels from "../Components/Crousers";
import "./bannersAndCrouser.css";
import {
  useGetBannersAndCaroselsQuery,
  useAddProductCaresolsAndbannersMutation,
} from "@/redux/services/carosolsAndBanner";
import { MediaItem } from "../../../shared/types/types";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

const BannersAndCrouser = () => {
  const { data, error, isLoading } = useGetBannersAndCaroselsQuery();

  const [updateMedia, { isLoading: isSaving }] =
    useAddProductCaresolsAndbannersMutation();

  const [activeTab, setActiveTab] = useState<"banners" | "carousels">(
    "banners",
  );

  const [banners, setBanners] = useState<MediaItem[]>([]);
  const [carousels, setCarousels] = useState<MediaItem[]>([]);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  useEffect(() => {
    const item = data?.data?.[0];
    if (!item) return;

    setBanners(
      item.banners.map((b: any) => ({
        type: "existing",
        key: b.key,
        url: b.url,
      })),
    );

    setCarousels(
      item.carosels.map((c: any) => ({
        type: "existing",
        key: c.key,
        url: c.url,
      })),
    );
  }, [data]);

  if (isLoading) {
    return (
      <div className="bc-container">
        <div className="bc-state-card">Loading media...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bc-container">
        <div className="bc-state-card error">Failed to load media.</div>
      </div>
    );
  }

  const handleProceed = async () => {
    const formData = new FormData();

    banners.forEach((b) => {
      if (b.type === "existing") {
        formData.append("keepBanners", b.key);
      } else {
        formData.append("banners", b.file);
      }
    });

    carousels.forEach((c) => {
      if (c.type === "existing") {
        formData.append("keepCarosels", c.key);
      } else {
        formData.append("caresols", c.file);
      }
    });

    try {
      await updateMedia(formData).unwrap();
      setAlertInfo({
        title: "Media Saved",
        message: "Banners and carousel images have been updated successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      setAlertInfo({
        title: "Save Failed",
        message: "Something went wrong while updating the media.",
        variant: "error",
      });
    }
  };

  return (
    <div className="bc-container">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="bc-header">
        <div>
          <span className="bc-eyebrow">Storefront media</span>
          <h1>Banners & Carousels</h1>
          <p>Upload, review, and arrange promotional visuals for the app.</p>
        </div>
        <div className="bc-summary">
          <span>{banners.length} banners</span>
          <span>{carousels.length} carousels</span>
        </div>
      </div>

      <div className="bc-switch">
        <button
          className={activeTab === "banners" ? "active" : ""}
          onClick={() => setActiveTab("banners")}
        >
          Banners
        </button>

        <button
          className={activeTab === "carousels" ? "active" : ""}
          onClick={() => setActiveTab("carousels")}
        >
          Carousels
        </button>
      </div>

      {activeTab === "banners" ? (
        <Banners banners={banners} setBanners={setBanners} />
      ) : (
        <Carousels carousels={carousels} setCarousels={setCarousels} />
      )}

      <div className="bc-proceed">
        <button onClick={handleProceed} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Media"}
        </button>
      </div>
    </div>
  );
};

export default BannersAndCrouser;
