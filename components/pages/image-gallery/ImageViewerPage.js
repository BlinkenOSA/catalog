import dynamic from "next/dynamic";
import ImageHeader from "./parts/ImageHeader";
import ImageFooter from "./parts/ImageFooter";
import useSWR from "swr";
import {solrFetcher} from "../../../utils/fetcherFunctions";
import NotFound from "../search/results/NotFound";

const ImageViewerPage = ({selectedImage, isMobile=false}) => {
	const { data, error } = useSWR({query: `id:${selectedImage}`}, solrFetcher);

	const ImageViewer = dynamic(() => import('../catalog/finding-aids/parts/findingAidsDigitalContent/viewers/ImageViewerV2'), {
		ssr: false
	});

	if (error) {
		return (
			<NotFound
				face={'(x_x)'}
				mainText={'Search service unavailable'}
				text={'The search service is currently unavailable. Please try again later.'}
			/>
		)
	}

	return (
		<>
			<ImageHeader data={data} isMobile={isMobile} />
			<div style={{backgroundColor: '#BFBFBF', flex: 1}}>
				<ImageViewer id={selectedImage} isGallery={true} isMobile={isMobile}/>
			</div>
			<ImageFooter data={data} isMobile={isMobile} />
		</>
	)
}

export default ImageViewerPage;
