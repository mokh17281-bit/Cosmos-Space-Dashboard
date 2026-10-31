function sectionShow(id) {
  document.getElementById("today-in-space").classList.add("hidden");
  document.getElementById("launche").classList.add("hidden");
  document.getElementById("planets").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}
let apodImage = document.getElementById("apod-image");

let apodTitle = document.getElementById("apod-title");

let apodExplanation = document.getElementById("apod-explanation");

let apodDate = document.getElementById("apod-date");

let apodDateDetail = document.getElementById("apod-date-detail");
let apodDateInfo = document.getElementById("apod-date-info");

let apodCopyright = document.getElementById("apod-copyright");

let apodMediaType = document.getElementById("apod-media-type");

let apodDateInput = document.getElementById("apod-date-input");
let customDateInputSpan = document.querySelector(".custom-date-input-span");

let loadDateBtn = document.getElementById("load-date-btn");
let todayApodBtn = document.getElementById("today-apod-btn");

let apodLoading = document.getElementById("apod-loading");
let apodLoadingIcon = document.querySelector("#apod-loading i");
let apodLoadingText = document.querySelector("#apod-loading p");
let featuredLaunch = document.getElementById("featured-launch");
let AllLaunches = document.getElementById("launches-grid");
async function getTodayImage() {
  try {
    const Todayres = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=nktNQfcqHJBqgdjzF7CjrdMGCmkQbjMMBWrWQtT9`,
    );
    const data = await Todayres.json();
    if (Todayres.ok) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function displayTodayImage() {
  apodDate.innerHTML = "Astronomy Picture of the Day - Invalid Date";
  apodDateDetail.innerHTML = "";
  apodDateInfo.innerHTML = "";
  apodTitle.innerHTML = "Loading......";
  apodExplanation.innerHTML = "";
  apodDateInput.addEventListener("change", function () {
    customDateInputSpan.innerHTML = apodDateInput.value;
  });

  apodLoading.classList.remove("hidden");
  apodImage.classList.add("hidden");
  const DataImage = await getTodayImage();
  if (DataImage && DataImage.url && DataImage.media_type === "image") {
    apodImage.src = DataImage.url;

    apodImage.addEventListener("load", function () {
      apodLoading.classList.add("hidden");
      apodImage.classList.remove("hidden");
      apodTitle.innerHTML = DataImage.title;
      apodDate.innerHTML = `Astronomy Picture of the Day -${DataImage.date}`;
      apodDateDetail.innerHTML = DataImage.date;
      apodDateInfo.innerHTML = DataImage.date;
      apodExplanation.innerHTML = DataImage.explanation;
    });
    apodImage.addEventListener("error", function () {
      apodLoadingText.innerHTML = `Failed to load image`;
      apodLoadingIcon.classList.add("hidden");
    });
  } else {
    apodLoadingIcon.classList.add("hidden");
    apodLoadingText.innerHTML = `Failed to load image`;
    apodTitle.innerHTML = "Faild!";
    apodDate.innerHTML = "Astronomy Picture of the Day - Invalid Date";
    apodExplanation.innerHTML = "";
    apodDateDetail.innerHTML = "Invalid Date";
    apodDateInfo.innerHTML = "Invalid Date";
  }
  todayApodBtn.addEventListener("click", function () {
    customDateInputSpan.innerHTML = DataImage.date;
  });
}
displayTodayImage();
loadDateBtn.addEventListener("click", displayTodayImage);

async function getLanches() {
  try {
    const lanchesRes = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    );
    const lanchesData = await lanchesRes.json();

    if (lanchesRes.ok) {
      return lanchesData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function displayLanches() {
  const infoLanches = await getLanches();
  if (infoLanches) {
    featuredLaunch.innerHTML = ` 
<div 
  class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all" 
> 
  <div 
    class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" 
  ></div> 

  <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8"> 
    <div class="flex flex-col justify-between"> 
      <div> 
        <div class="flex items-center gap-3 mb-4"> 
          <span 
            class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2" 
          > 
            <i class="fas fa-star"></i> 
            Featured Launch 
          </span> 
          <span 
            class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold" 
          > 
            ${infoLanches.results[0].status.name} 
          </span> 
        </div> 

        <h3 class="text-3xl font-bold mb-3 leading-tight"> 
          ${infoLanches.results[0].name} 
        </h3> 

        <div 
          class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400" 
        > 
          <div class="flex items-center gap-2"> 
            <i class="fas fa-building"></i> 
            <span>${infoLanches.results[0].launch_service_provider.name}</span> 
          </div> 

          <div class="flex items-center gap-2"> 
            <i class="fas fa-rocket"></i> 
            <span>${infoLanches.results[0].rocket.configuration.name}</span> 
          </div> 
        </div> 

        <div 
          class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6" 
        > 
          <i class="fas fa-clock text-2xl text-blue-400"></i> 
          <div> 
            <p class="text-2xl font-bold text-blue-400">2</p> 
            <p class="text-xs text-slate-400">Days Until Launch</p> 
          </div> 
        </div> 

        <div class="grid xl:grid-cols-2 gap-4 mb-6"> 
          <div class="bg-slate-900/50 rounded-xl p-4"> 
            <p 
              class="text-xs text-slate-400 mb-1 flex items-center gap-2" 
            > 
              <i class="fas fa-calendar"></i> 
              Launch Date 
            </p> 
            <p class="font-semibold">${new Date(infoLanches.results[0].net).toLocaleDateString("en-GB")}</p> 
          </div> 

          <div class="bg-slate-900/50 rounded-xl p-4"> 
            <p 
              class="text-xs text-slate-400 mb-1 flex items-center gap-2" 
            > 
              <i class="fas fa-clock"></i> 
              Launch Time 
            </p> 
            <p class="font-semibold">${new Date(infoLanches.results[0].net).toLocaleTimeString("en-GB")}</p> 
          </div> 

          <div class="bg-slate-900/50 rounded-xl p-4"> 
            <p 
              class="text-xs text-slate-400 mb-1 flex items-center gap-2" 
            > 
              <i class="fas fa-map-marker-alt"></i> 
              Location 
            </p> 
            <p class="font-semibold text-sm">${infoLanches.results[0].pad.location.name}</p> 
          </div> 

          <div class="bg-slate-900/50 rounded-xl p-4"> 
            <p 
              class="text-xs text-slate-400 mb-1 flex items-center gap-2" 
            > 
              <i class="fas fa-globe"></i> 
              Country 
            </p> 
            <p class="font-semibold">${infoLanches.results[0].pad.location.country.name}</p> 
          </div> 
        </div> 

        <p class="text-slate-300 leading-relaxed mb-6"> 
          ${infoLanches.results[0].mission.description}
        </p> 
      </div> 

      <div class="flex flex-col md:flex-row gap-3"> 
        <button 
          class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2" 
        > 
          <i class="fas fa-info-circle"></i> 
          View Full Details 
        </button> 

        <div class="icons self-end md:self-center"> 
          <button 
            class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors" 
          > 
            <i class="far fa-heart"></i> 
          </button> 
          <button 
            class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors" 
          > 
            <i class="fas fa-bell"></i> 
          </button> 
        </div> 
      </div> 
    </div> 

    <div class="relative"> 
      <div 
        class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50" 
      > 
        <img 
          src="${infoLanches.results[0].image.image_url}" 
          alt="${infoLanches.results[0].name}"
          class="w-full h-full min-h-[400px] object-cover"
        >
        <div 
          class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" 
        ></div> 
      </div> 
    </div> 
  </div> 
</div>`;
    for (let i = 1; i < infoLanches.results.length; i++) {
      AllLaunches.innerHTML += `
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer" 
> 
  <div 
    class="relative h-48 bg-slate-900/50 flex items-center justify-center" 
  > 
    <img src="${infoLanches.results[i].image.image_url}" alt="${infoLanches.results[i].name}" class="w-full h-full object-cover">
    <div class="absolute top-3 right-3"> 
      <span 
        class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold" 
      > 
        ${infoLanches.results[i].status.name} 
      </span> 
    </div> 
  </div> 

  <div class="p-5"> 
    <div class="mb-3"> 
      <h4 
        class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors" 
      > 
        ${infoLanches.results[i].name} 
      </h4> 

      <p class="text-sm text-slate-400 flex items-center gap-2"> 
        <i class="fas fa-building text-xs"></i> 
        ${infoLanches.results[i].launch_service_provider.name} 
      </p> 
    </div> 

    <div class="space-y-2 mb-4"> 
      <div class="flex items-center gap-2 text-sm"> 
        <i class="fas fa-calendar text-slate-500 w-4"></i> 
        <span class="text-slate-300">${new Date(infoLanches.results[i].net).toLocaleDateString("en-GB")}</span> 
      </div> 

      <div class="flex items-center gap-2 text-sm"> 
        <i class="fas fa-clock text-slate-500 w-4"></i> 
        <span class="text-slate-300">${new Date(infoLanches.results[i].net).toLocaleTimeString("en-GB")}</span> 
      </div> 

      <div class="flex items-center gap-2 text-sm"> 
        <i class="fas fa-rocket text-slate-500 w-4"></i> 
        <span class="text-slate-300">${infoLanches.results[i].rocket.configuration.name}</span> 
      </div> 

      <div class="flex items-center gap-2 text-sm"> 
        <i class="fas fa-map-marker-alt text-slate-500 w-4"></i> 
        <span class="text-slate-300 line-clamp-1">${infoLanches.results[i].pad.name}</span> 
      </div> 
    </div> 

    <div 
      class="flex items-center gap-2 pt-4 border-t border-slate-700" 
    > 
      <button 
        class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold" 
      > 
        Details 
      </button> 

      <button 
        class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors" 
      > 
        <i class="far fa-heart"></i> 
      </button> 
    </div> 
  </div> 
</div>`;
    }
  }
}

displayLanches();
// getAllPlanets
let planetCards = document.querySelectorAll(".planet-card");
let mainPlanets = document.querySelector(".main-planets");

async function getAllPlanets() {
  try {
    const AllPlanetsRes = await fetch(
      `https://solar-system-opendata-proxy.vercel.app/api/planets`,
    );
    const dataPlanets = await AllPlanetsRes.json();
    if (AllPlanetsRes.ok) {
      return dataPlanets;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
let planetComparisonTbody = document.getElementById("planet-comparison-tbody");

DisplayAllPlanets();
function PlanetColor(planetName) {
    if (planetName === "Mercury") {
        return "rgb(232, 178, 8)";
    } else if (planetName === "Venus") {
        return "rgb(249, 115, 22)";
    } else if (planetName === "Earth") {
        return "rgb(59, 130, 246)";
    } else if (planetName === "Mars") {
        return "rgb(237, 67, 67)";
    } else if (planetName === "Jupiter") {
        return "rgb(215, 118, 6)";
    } else if (planetName === "Saturn") {
        return "rgb(233, 178, 8)";
    } else if (planetName === "Uranus") {
        return "rgb(6, 181, 211)";
    } else if (planetName === "Neptune") {
        return "rgb(99, 102, 240)";
    } else {
        return "rgb(147, 162, 183)";
    }
}
function typeColor(Type){
  if(Type==="Ice Giant")
    return "rgb(43, 86, 161)";
  if (Type==="Gas Giant") {
    return "rgb(98, 64, 163)"
    
  } else {
    return "rgb(139, 79, 50)"
  }
}
async function DisplayAllPlanets() {
  const dataAllPlanets = await getAllPlanets();
  console.log(dataAllPlanets);
    let row = "";


  for (let i = 0; i < planetCards.length; i++) {
    const container = `<div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${dataAllPlanets.bodies[i].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${dataAllPlanets.bodies[i].englishName}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                 ${dataAllPlanets.bodies[i].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${dataAllPlanets.bodies[i].semimajorAxis.toLocaleString()}km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${dataAllPlanets.bodies[i].meanRadius.toLocaleString()} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${"10^" + dataAllPlanets.bodies[i].mass.massExponent + "× " + dataAllPlanets.bodies[i].mass.massValue} kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${dataAllPlanets.bodies[i].density} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${dataAllPlanets.bodies[i].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${dataAllPlanets.bodies[i].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${dataAllPlanets.bodies[i].moons?.length ?? 0}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                   ${dataAllPlanets.bodies[i].gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >${dataAllPlanets.bodies[i].discoveredBy || "Known since antiquity"}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >${dataAllPlanets.bodies[i].discoveryDate || "Ancient times"}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >${dataAllPlanets.bodies[i].type}</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${dataAllPlanets.bodies[i].vol.volValue + "× " + "10^" + dataAllPlanets.bodies[i].vol.volExponent} km³</span>
                  </div>
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass: ${"10^" + dataAllPlanets.bodies[i].mass.massExponent + "× " + dataAllPlanets.bodies[i].mass.massValue} kg</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >urface gravity: ${dataAllPlanets.bodies[i].gravity} m/s² </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density:${dataAllPlanets.bodies[i].density} g/cm³ </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Axial tilt: ${dataAllPlanets.bodies[i].axialTilt}° </span
                    >
                  </li>
                </ul>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      >${dataAllPlanets.bodies[i].perihelion} km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >${dataAllPlanets.bodies[i].aphelion} km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      >${dataAllPlanets.bodies[i].eccentricity}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      >${dataAllPlanets.bodies[i].inclination || "N/A"}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >${dataAllPlanets.bodies[i].axialTilt || "N/A"}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${dataAllPlanets.bodies[i].avgTemp}°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >${dataAllPlanets.bodies[i].escape} km/s</span
                    >
                  </div>
                </div>
              </div>
              <button
                class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>`;
    mainPlanets.innerHTML = container;
row += `
<tr class="hover:bg-slate-800/30 transition-colors">

    <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
        <div class="flex items-center space-x-2 md:space-x-3">
            <div
                class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                style="background-color: ${PlanetColor(dataAllPlanets.bodies[i].englishName)}"
            ></div>

            <span class="font-semibold text-sm md:text-base whitespace-nowrap">
                ${dataAllPlanets.bodies[i].englishName}
            </span>
        </div>
    </td>

    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${(dataAllPlanets.bodies[i].semimajorAxis / 149597870700).toFixed(2)}
    </td>

    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${(dataAllPlanets.bodies[i].equaRadius * 2).toLocaleString()}
    </td>

    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${(dataAllPlanets.bodies[i].mass.massValue * Math.pow(10, dataAllPlanets.bodies[i].mass.massExponent) / 5.9722e24).toFixed(3)}
    </td>

    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${dataAllPlanets.bodies[i].sideralOrbit}days
    </td>

    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
        ${dataAllPlanets.bodies[i].moons?.length ?? 0}
    </td>

    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
        <span class="px-2 py-1 rounded text-xs " style="background-color:${typeColor(dataAllPlanets.bodies[i].type)}">
            ${dataAllPlanets.bodies[i].type}
        </span>
    </td>

</tr>
`;
    planetCards[i].addEventListener("click", function () {
      mainPlanets.innerHTML = container;
    });
  }
      planetComparisonTbody.innerHTML = row;

}

DisplayAllPlanets();



         
        
    

