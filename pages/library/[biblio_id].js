import Hashids from 'hashids'


export async function getServerSideProps(context) {
	const hashids = new Hashids('osalibrary', 8)
	const {biblio_id} = context.params;

	const catalogID = hashids.encode(biblio_id)

	return {
		redirect: {
			destination: `/catalog/${catalogID}`,
			permanent: false,
		},
	}
}

const BiblioRedirect = () => {
	return (<div/>)
}

export default BiblioRedirect