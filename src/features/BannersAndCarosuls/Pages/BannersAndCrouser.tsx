import { useState } from "react";
import Banners from "../Components/Banners";
import Carousels from "../Components/Crousers";
import "./bannersAndCrouser.css";
import { ApiResponse } from '../../../shared/types/types';

const apiResult: ApiResponse = {
    "success": true,
    "data": [
        {
            "_id": "69877e6957c31be5d0706fb8",
            "banners": [
                "https://dzihz2b7sjcfx.cloudfront.net/bannerAndCaresols/bedroom_1.png-1770487162625-16746.png-1770487580415-12614.png?Expires=1770491186&Key-Pair-Id=K1G7OUTC12YYOG&Signature=xC2qokT1694kXBQdd4sjfZwinPCR4CnYdxmoqzXoHu3bLIGfYTnyHGO~2pGgu4Yo-EdRaLlFIcQbaGKZni-mublfh--3xDaHAqkXZohhbK51JRzUpASjprc5gsCe90i0S6H4DHI9Qt0F02ov7MzaI9M6bcuy2j3lDlQxvQbQaa2caVGD1IQI4j7pJfw7vDt-rpdtrTJvw4Jtcqk3eD2X-FYHnMCcUyg5aUvk12AAdRY4lJVcVDLCkDOmtAcvOotc1uqUDK-eEeimSqK22DfnkiGI7pOcpsHZHT2zfxSIYA9U0yNtMu3Amha8h0LQVP5zChFvk7wzaGSwgyp9Ne1VFA__"
            ],
            "carosels": [
                "https://dzihz2b7sjcfx.cloudfront.net/bannerAndCaresols/exterior123.jpg-1770487580418-10085.jpeg?Expires=1770491186&Key-Pair-Id=K1G7OUTC12YYOG&Signature=jjzFql8J4gv2HFD76XJAuGxUTCObRDO5tjXvT-bKNk7EdQxDdovrPGyhsMmeZ1gJ7v-W2Q3HuYhYs7vekJmXDAaWTjQRwZQ3gWU6lgJqi6yKbzVRWqqR0ZJbDqjrv-4lyUzXNpmOlM1MjKl~NBxm10KKjOiJuanhxxTN1SWXLuC6E5itLUzg8SKhXwtbUosimiDcHwLgX7KXPn7KXcQWNydyXMj0NXHzXaJfn~YkftkXArn1-L6RXUo~6YI67aZ8WJFb0dr24E9UTsm2-LWH42L6yOnOESvQamG4zNFShpHzMGO6wfbFmioYvIdltF3pempVc7jhW30HkrVN3fVc8g__",
                "https://dzihz2b7sjcfx.cloudfront.net/bannerAndCaresols/bedmodren.jpg-1770487580418-26032.jpeg?Expires=1770491186&Key-Pair-Id=K1G7OUTC12YYOG&Signature=uM0OzG2ervnBZl-vn3sFf13YONS8r~75SZ08xAF3u6uah7UROBLYZqTjRGx1MzY8xXpUa8NjKIBWl1letSdpavyOsybwtaWbvE7~q-Afs6RAdXlwy905j-O4VMxpo0Qrww3ETOgGl78SEsMnGUb3wRhwuaJzDwgbivE1MSTZQrqqSp~6RbG-t6~gSI3l3-ma3hVYuZ3LXIBraOXRdT8Sa4TQOy7YuMZ7NNtpHjfkcVOpLyQ7k1LLJ4AkKsn5GibXghuRQM3PAxJtQLM-PKd8o2R~SNuZIUSlDiARAHT0LfNqKWp1UvnRz7EDkzNbcs0P~HWCTq4j6cy1~43cEMGBGw__",
                "https://dzihz2b7sjcfx.cloudfront.net/bannerAndCaresols/bedmap.jpg-1770487580420-48595.jpeg?Expires=1770491186&Key-Pair-Id=K1G7OUTC12YYOG&Signature=V-yE6PbJRIw4a369Q5b-ZdFY3O1elccSNtrGUaB3TajljWIdD4s6G35fae9Jq3Z9YpjEv1kOGR-bWNmMWuJFF~bxYAo0ZXdiwL5NmZ1r-LIB0~IokuzIQ6SrYfw6MIIbRLT7EBBIRSOEh7Su9OP~BGXED64HDxPSTN~4Tvov0i9MU9RniEzFF5zBmK1PhUw8FVcTS-dQIbLYor2~inqCbgOV50pYrHe0P8yNqabm9LuKcaFutrhQdIvSFzoApN49tHjJtNoGfaFeyWoMqQ7tcssZfqK6kiNiS2DYNjtOW9~Cs-JxSNRegDlLUdDUnK7cOW5p27qmp4VZS40SrRK3mQ__",
                "https://dzihz2b7sjcfx.cloudfront.net/bannerAndCaresols/1bed.jpg-1770487580425-32395.jpeg?Expires=1770491186&Key-Pair-Id=K1G7OUTC12YYOG&Signature=OZvdyJXcGCJo4aE8gbPnzOHrNXDbDp27qIj42QklDiINvVCWNxBR6LExfbowNTEEZUYUMTEio~FqEfMYOBK5RJQ9WJ~sJuJhbg-ZQD93r7BJCNId9Q2ulUJpnMpOWMEnx9bKkv8gcFbkhNXgrg3Nlg03AyeU5hY0ekidXLolgtGx3ob5efl8f1zMRGIgoyngVWQWSckOatL05VB3-UXfLNubKT0JmEOym47kodeag8eH1iklHUcjPsRyPrsVa9xbeAq84l-Dh3Je9BX3TLV~FaF~ioKtSHnsF6XbZmTDUgqVhEKnupMKu06z9Drw36XR0CAO7KecvRE6cZ6B8mB2bQ__",
                "https://dzihz2b7sjcfx.cloudfront.net/bannerAndCaresols/bigbedroom.jpg-1770487580427-15940.jpeg?Expires=1770491186&Key-Pair-Id=K1G7OUTC12YYOG&Signature=n5Rlv0qCEcoyHACJb-zSwXQr7JKDyd~KTvMsatSAGKxqigUiyL2rqy0WEJ9nWcRajTzt6qaUr8D9qDlVg~fxT7fLJtSO1ESorehamh14SDRUpiYuV4wrnUzuI6czm8WM6vsLN6zqXS4kmBoGyILgh20vDF~4rvLikoDNKoQuhsnPG~oTfnAdafSJUeTr3NfJeMQ5Z1Ad~5ln0aY3yZfOh6C3iLHRcDo4EwuDOLPOIksMlqvt9zvOGI7B2x1pY2N2Q-YS3Sv~r0oowhqjyIqo02EWvp425EKAQBkqUhYXYxRRcVsxUAH87dJgpsZZbiIoPKT~elacIdUfqi05api65Q__"
            ]
        }
    ]
}

const BannersAndCrouser = () => {
  const [activeTab, setActiveTab] = useState<"banners" | "carousels">("banners");

  const config = apiResult.data[0];

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
        <Banners banners={config.banners} />
      ) : (
        <Carousels carousels={config.carosels} />
      )}
    </div>
  );
};

export default BannersAndCrouser;
