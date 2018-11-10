const oldImage = (() => {
	let dataArr;
	let $cardContainer;
	let $deleteBtns;

	function refresh() {
		const oldData = getLocalData();
		dataArr = oldData.dataArr;
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function deleteImage(e) {
		e.preventDefault();
		$btn = $(e.target);
		const urlOfImageToDelete = $btn.attr('data-url');
		console.log(dataArr);
		const newArray = dataArr.filter(function(el) {
			return el.imageURL != urlOfImageToDelete
		});
		dataArr = newArray;
		deleteLocalData(newArray);
		refresh();
	}

	function cache() {
		$cardContainer = $('#card_container');
	}

	function cacheDynamic() {
		$deleteBtns = $('.delete-btn')
	}

	function bindDynamicEvents() {
		$deleteBtns.click(deleteImage);
	}

	function render() {
		let cardsHTML = '';
		dataArr.forEach(imageCaptionObj => {
			cardsHTML += `<div class="col-md-2">
                            <div class="rotating-card-container">
                                <div class="card card-rotate card-background">
                                    <div class="front front-background" style="background-image:url('${imageCaptionObj.imageURL}');">
                                        <div class="card-body">
                                            <h6 class="card-category">hover to see caption</h6>
                                        </div>
                                    </div>

                                    <div class="back back-background" style="background-image: url('${imageCaptionObj.imageURL}');">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                ${imageCaptionObj.caption.text}
                                            </h5>
                                            <p class="card-description">
                                                <small class="text-danger">${imageCaptionObj.caption.confidence}</small>
                                            </p>
                                            <div class="footer justify-content-center">
                                                <a class="btn btn-danger btn-just-icon btn-fill btn-round">
                                                    <i class="material-icons delete-btn" data-url="${imageCaptionObj.imageURL}">delete</i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
		});
		$cardContainer.html(cardsHTML);
	}

	function init() {
		cache();
		const oldData = getLocalData();
		if (oldData) { dataArr = oldData.dataArr; } else {
			dataArr = [];
		}

		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init, refresh };
})();