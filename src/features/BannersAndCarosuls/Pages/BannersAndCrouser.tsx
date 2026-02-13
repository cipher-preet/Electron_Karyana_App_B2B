import { useEffect, useState } from "react";
import Banners from "../Components/Banners";
import Carousels from "../Components/Crousers";
import "./bannersAndCrouser.css";
import {
  useGetBannersAndCaroselsQuery,
  useAddProductCaresolsAndbannersMutation,
} from "@/redux/services/carosolsAndBanner";
import { MediaItem } from "../../../shared/types/types";

const BannersAndCrouser = () => {
  const { data, error, isLoading } = useGetBannersAndCaroselsQuery();

  const [updateMedia, { isLoading: isSaving }] =
    useAddProductCaresolsAndbannersMutation();

  const [activeTab, setActiveTab] = useState<"banners" | "carousels">(
    "banners",
  );

  const [banners, setBanners] = useState<MediaItem[]>([]);
  const [carousels, setCarousels] = useState<MediaItem[]>([]);

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
    return <div>Loading...</div>;
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

    await updateMedia(formData);
    alert("Updated successfully");
  };

  return (
    <div className="bc-container">
      <div className="bc-header">
        <h1>Banners & Carousels</h1>
        <p>Upload, view and delete promotional visuals</p>
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
          {isSaving ? "Saving..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default BannersAndCrouser;
