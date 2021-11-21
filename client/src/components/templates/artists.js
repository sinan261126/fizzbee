import './styling/artists.css';
import { getColorArtists, getImage } from '../utils/helperFunctions';
import SkeletonArtists from '../skeletons/skeletonArtists';
import { useRef } from 'react';
import ScrollSection from '../utils/scroll-button';

function Artists({ show, listName }) {
  const holderRef = useRef();

  return (
    <div>
      {!show && <SkeletonArtists />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
      <ScrollSection>
        <div className="cards-holder" ref={holderRef}>
          {show?.map((item, index) => (
            <a
              className="d-flex flex-column align-items-center text-decoration-none me-3 p-2"
              key={item.id}
              href={`${window.location.origin}/app#/artist/${item.id}`}
            >
              <div className="artist-cards" id={item.id + index}>
                <img
                  src={getImage(item?.images, 'sm')}
                  alt={item?.name}
                  crossOrigin="anonymous"
                  id={item.id}
                  onLoad={() => getColorArtists(item.id, index)}
                />
              </div>
              <span className="fw-name mt-2">{item?.name}</span>
            </a>
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
export default Artists;
