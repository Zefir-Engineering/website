// used by the marketing team for analytics and AB testing, to track which page,
// ad or marketing pitch was presented to the seller initially
function storeDataForProductPitchABTesting() {
  const path = location.pathname.toLowerCase();

  const productPitches = [
    [/\/(lp\/|)max($|\/.*)/, 'MAX'],
    [/\/(lp\/|)cover($|\/.*)/, 'COVER'],
    [/\/(lp\/|)vendre(-|\/).+/, 'COVER'],
    [/\/.*/, 'NONE'],
  ];
  localStorage.setItem('productPitch', productPitches.find((v) => v[0].test(path))[1]);
}

let showError = true;
function displayError() {
  if (showError) {
    showError = false;
    alert('Merci de préciser votre numéro de rue.');
    setTimeout(() => (showError = true), 1000);
  }
}

function createCookieAndRedirect(place) {
  const componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
  };

  // for some reason, the first item in the address_components object should be the street number, if it's not, we manually set the cookie for it
  if (place.address_components[0].types[0] != 'street_number') {
    document.cookie = 'street_number=1;path=/';
  }
  // Get each component of the address from the place details, and then fill-in the corresponding field on the cookie.
  for (const addressComponent of place.address_components) {
    const addressType = addressComponent.types[0];

    const formFieldName = componentForm[addressType];
    if (!formFieldName) {
      continue;
    }

    const value = encodeURIComponent(addressComponent[componentForm[addressType]]);
    document.cookie = `${addressType}=${value};path=/`;
  }

  window.location.pathname = '/offre/demande/v2';
}

function useFirstPrediction(input) {
  const value = input.val();
  if (!value) {
    return;
  }

  if (!value.match(/^\d/)) {
    displayError();
    return;
  }

  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions({ input: value, componentRestrictions: { country: 'fr' } }, async (predictions) => {
    if (predictions.length <= 0) {
      return;
    }

    input.val(predictions[0].description);
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ placeId: predictions[0].place_id });
    createCookieAndRedirect(response.results[0]);
  });
}

function initAutoComplete(inputSelector, buttonSelector) {
  const input = $(inputSelector);
  const button = $(buttonSelector);
  // Create the autocomplete object, restricting the search predictions to addresses and France.
  // Address must start with a number to start Autocomplete
  const autocomplete = new google.maps.places.Autocomplete(input[0], {
    types: ['address'],
    componentRestrictions: { country: 'fr' },
  });

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, save the
  // address fields in local storage.
  autocomplete.addListener('place_changed', () => {
    if (!/^\d/.test(input.val())) {
      displayError();
      return;
    }

    const place = autocomplete.getPlace();
    if (!!place.address_components) {
      createCookieAndRedirect(place);
    }
  });

  button.on('click', () => {
    useFirstPrediction(input);
    return false;
  });

  input.keypress((event) => {
    if (event.which == 13) {
      // if enter pressed
      useFirstPrediction(input);
      return false;
    }
  });
}

$(function () {
  initAutoComplete('#autocomplete', '#goingnext');
  initAutoComplete('#autocomplete_2', '#goingnext-2');
  initAutoComplete('#autocomplete_3', '#goingnext-3');
  storeDataForProductPitchABTesting();
});
