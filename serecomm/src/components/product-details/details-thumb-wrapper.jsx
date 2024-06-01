import { useState } from "react";
import PopupVideo from "../common/popup-video";

const DetailsThumbWrapper = ({
  imgURL,
  handleImageActive,
  activeImg,
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  return (

    <>
     
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <button
                className={`nav-link ${imgURL === activeImg ? "active" : ""}`}
                onClick={() => handleImageActive(item)}>
                  <img src={imgURL} 
                  width={imgWidth}
                  height={imgHeight}
                  alt="image"
                  style={{ width: "100%", height: "100%" }}/>
             </button>
           
              <div className="tp-product-badge">
                {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
              </div>
              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal popup start */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
      {/* modal popup end */}
    </>
  );
};

export default DetailsThumbWrapper;
