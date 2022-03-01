const container = document.querySelector(".brew-container");

function createBrew(brewList, term) {
  let filteredData = [];

  if (!term.trim()) {
    filteredData = brewList;
  } else {
    filteredData = brewList.filter(
      (item) =>

        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.brewery_type.toLowerCase().includes(term.toLowerCase()) ||
        (item.street && item.street.includes(term)) ||
        (item.city && item.city.includes(term)) ||
        (item.postal_code && item.postal_code.includes(term)) ||
        (item.state && item.state.includes(term)) ||
        (item.country && item.country.includes(term)) ||
        (item.address_2 && item.address_2.includes(term)) ||
        (item.address_3 && item.address_3.includes(term)) ||
        (item.website_url && item.website_url.includes(term)) ||
        (item.phone && item.phone.includes(term)) 

   );
  }

  let html = "";
  filteredData.map((item) => {
    html += `
    <div class="card">

    <p class="brew-name">Brewery_Name: ${item.name}</p>
    <p class="brew-type">Brewery_Type: ${item.brewery_type}</p>
    <p class="address-1">Brewery_Address_1: ${item.street}, 
                                  ${item.city},
                                  ${item.postal_code}, 
                                  ${item.state},
                                  ${item.country}
                                  </p>
    <p class="address-2">Brewery_Address_2: ${item.address_2}</p>
    <p class="address-3">Brewery_Address_3: ${item.address_3}</p>
    <p class="url">Brewery's_URL: ${item.website_url}</p>
    <p class="phone">Brewery_Phone number:${item.phone}</p>
    
    </div>`;
  });

  container.innerHTML = html;
}
let brews = [];
async function getBrew() {
  try {
    const data = await fetch("https://api.openbrewerydb.org/breweries", {
      method: "GET",
    });
    const brewList = await data.json();
    return brewList;
  } catch (error) {
    console.error("Error");
  }
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", async (e) => {
  const term = e.target.value;

  const data = await getBrew();

  createBrew(data, term);
});

getBrew().then((data) => createBrew(data, ""));
