import dynamic from "next/dynamic";
import ImageHeader from "./parts/ImageHeader";
import ImageFooter from "./parts/ImageFooter";
import useSWR from "swr";
import {solrFetcher} from "../../../utils/fetcherFunctions";

const ImageViewerPage = ({selectedImage}) => {
	const { data, error } = useSWR({query: `id:${selectedImage}`}, solrFetcher);

	const ImageViewer = dynamic(() => import('../../catalog/finding-aids/parts/findingAidsDigitalContent/viewers/ImageViewerV2'), {
		ssr: false
	});

	return (
		<>
			<ImageHeader data={data} />
			<div style={{backgroundColor: '#BFBFBF', flex: 1}}>
				<ImageViewer id={selectedImage} isGallery={true} />
			</div>
			<ImageFooter data={data} />
		</>
	)
}

export default ImageViewerPage;