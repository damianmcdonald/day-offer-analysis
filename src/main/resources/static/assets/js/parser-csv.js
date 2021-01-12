function mapStatus(status) {
	var mappedStatus;
	switch (status) {
		case "OFFER_RECEIVED":
			mappedStatus = "Oferta recibido";
		break;
		case "ACCEPTED":
			mappedStatus = "Aceptado";
		break;
		case "COMPLETE":
			mappedStatus = "Completado";
		break;
		case "IN_PROGRESS":
			mappedStatus = "En marcha";
		break;
		default:
			mappedStatus = "Oferta recibido";
		break;
	}
	return mappedStatus;
}

function normalize(value) {
	const dataSetItem = new Object();
	// Client name
	dataSetItem.client = value.client;
	dataSetItem.status = mapStatus(value.status);
	// Status dates in a denormalized format
	dataSetItem.statusDate = new Date(value.statusDate);
	dataSetItem.statusDateYYYY = new Date(new Date(value.statusDate).getFullYear());
	dataSetItem.statusDateYYYYMM = new Date(new Date(value.statusDate).getFullYear() + "-" + (new Date(value.statusDate).getMonth()+1));
	dataSetItem.statusDateTimestamp = new Date(value.statusDate).getTime();
	// Tenancy
	dataSetItem.cloud = value.cloud;
	dataSetItem.greenfield = (value.greenfield === 'TRUE');
	dataSetItem.regions = parseInt(value.regions);
	dataSetItem.accounts = parseInt(value.accounts);
	dataSetItem.applications = parseInt(value.applications);
	// Networking
	dataSetItem.vpcs = parseInt(value.vpcs);
	dataSetItem.subnets = parseInt(value.subnets);
	dataSetItem.hasConnectivity = (value.hasConnectivity === 'TRUE');
	dataSetItem.hasPeerings = (value.hasPeerings === 'TRUE');
	// Security
	dataSetItem.hasDirectoryService = (value.hasDirectoryService === 'TRUE');
	dataSetItem.hasAdvancedSecurity = (value.hasAdvancedSecurity === 'TRUE');
	// Monitoring and Management
	dataSetItem.hasAdvancedLogging = (value.hasAdvancedLogging === 'TRUE');
	dataSetItem.hasAdvancedMonitoring = (value.hasAdvancedMonitoring === 'TRUE');
	dataSetItem.hasAdvancedBackup = (value.hasAdvancedBackup === 'TRUE');
	// Deployment
	dataSetItem.virtualMachines = parseInt(value.virtualMachines);
	dataSetItem.buckets = parseInt(value.buckets);
	dataSetItem.databases = parseInt(value.databases);
	dataSetItem.hasElb = (value.hasELB === 'TRUE');
	dataSetItem.hasAutoScripts = (value.hasAutoScripts === 'TRUE');
	// Other services
	dataSetItem.hasOtherServices = (value.hasOtherServices === 'TRUE');
	dataSetItem.service1 = value.service1;
	dataSetItem.service2 = value.service2;
	dataSetItem.service3 = value.service3;
	dataSetItem.service4 = value.service4;
	dataSetItem.service5 = value.service5;
	// Requirements phase
	dataSetItem.phase1EstimatePre = parseFloat(value.phase1EstimatePre);
	dataSetItem.phase1Estimate = parseFloat(value.phase1Estimate);
	dataSetItem.phase1Deviation = parseFloat(value.phase1Deviation);
	// Design phase
	dataSetItem.phase2EstimatePre = parseFloat(value.phase2EstimatePre);
	dataSetItem.phase2Estimate = parseFloat(value.phase2Estimate);
	dataSetItem.phase2Deviation = parseFloat(value.phase2Deviation);
	// Deployment phase
	dataSetItem.phase3EstimatePre = parseFloat(value.phase3EstimatePre);
	dataSetItem.phase3Estimate = parseFloat(value.phase3Estimate);
	dataSetItem.phase3Deviation = parseFloat(value.phase3Deviation);
	// Support phase
	dataSetItem.phase4EstimatePre = parseFloat(value.phase4EstimatePre);
	dataSetItem.phase4Estimate = parseFloat(value.phase4Estimate);
	dataSetItem.phase4Deviation = parseFloat(value.phase4Deviation);
	// Totals
	dataSetItem.totalPre = parseFloat(value.totalPre);
	dataSetItem.total = parseFloat(value.total);
	dataSetItem.totalDeviation = parseFloat(value.totalDeviation);
	// Additional information
	dataSetItem.travel = parseInt(value.travel);
	dataSetItem.administered = (value.administered === 'TRUE');;
	dataSetItem.geoLocation = value.geoLocation;
	dataSetItem.isValid = (value.isValid === 'TRUE');

	return dataSetItem;
 }

 function parseCsvtoJson() {
 	let csvDataSet = [];
 	// Papa.parse("/v1/dataset", {
 	Papa.parse("/assets/data/dataset.csv", {
		download: true,
		header: true,
		worker: false,
		skipEmptyLines: true,
		fastMode: true,
		complete: function(results) {
			let rawCsvDataSet = results.data;
			$.each( rawCsvDataSet, function( key, value ) {
				csvDataSet.push(normalize(value));
			});
		}
	});
	 return csvDataSet;
 }
