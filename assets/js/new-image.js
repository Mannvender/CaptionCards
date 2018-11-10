const newImage = (() => {
	let $newImageCard;
	let $imageUrlModal;
	let $analyzeImageBtn;
	let $cardContainer;
    let $imageUrlInp;
    
    const uriBasePreRegion = "https://";
    const uriBasePostRegion = ".api.cognitive.microsoft.com/vision/";
    const uriBaseAnalyze = "v1.0/analyze";
    const uriBaseLandmark = "v1.0/models/landmarks/analyze";
    const uriBaseCelebrities = "v1.0/models/celebrities/analyze";
    const uriBaseThumbnail = "v1.0/generateThumbnail";
    const uriBaseOcr = "v1.0/ocr";
    const uriBaseHandwriting = "v1.0/recognizeText";

	function AnalyzeImage(sourceImageUrl) {
		// Request parameters.
		const params = {
			"visualFeatures": "Categories,Description,Color",
			"details": "",
			"language": "en",
		};

		// Perform the REST API call.
		return $.ajax({
			url: uriBasePreRegion +
				'westcentralus' +
				uriBasePostRegion +
				uriBaseAnalyze +
				"?" +
				$.param(params),

			// Request headers.
			beforeSend: function(jqXHR) {
				jqXHR.setRequestHeader("Content-Type", "application/json");
				jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key",
					encodeURIComponent('6aa62e2f8b444d119475f842f8500585'));
			},

			type: "POST",

			// Request body.
			data: '{"url": ' + '"' + sourceImageUrl + '"}',
		})

	}

	function renderImage(e) {
		e.preventDefault();

		// Display the image.
        const sourceImageUrl = $imageUrlInp.val();
        $imageUrlInp.val('');

		AnalyzeImage(sourceImageUrl).then(data => {
			let caption = '';
			if (data.description.captions) {
                caption = data.description.captions[0];

                $imageUrlModal.modal('toggle');

                putLocalData(sourceImageUrl, caption);
                oldImage.refresh();
			} else {
				alert('something wrong');
			}

		});
	}

	function toggleModal() {
		$imageUrlModal.modal('toggle');
	}

	function cache() {
		$newImageCard = $('#add_new_image_card');
		$imageUrlModal = $('#imageUrlModal');
		$analyzeImageBtn = $('#analyze_img_btn');
		$cardContainer = $('#card_container');
		$imageUrlInp = $('#imageUrlInp');
	}

	function bindEvents() {
		$newImageCard.click(toggleModal);
		$analyzeImageBtn.click(renderImage)
	}

	function init() {
		cache();
		bindEvents();
	}
	return { init };
})();