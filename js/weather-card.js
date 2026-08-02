class WeatherCard extends HTMLElement {
    static observedAttributes = ["latitude", "longitude"];
  
    connectedCallback() {
      this.controller = new AbortController();
      this.render();
      this.loadWeather();
    }
  
    disconnectedCallback() {
      if (this.controller) {
        this.controller.abort();
      }
    }
  
    attributeChangedCallback() {
      if (this.isConnected) {
        this.controller.abort();
        this.controller = new AbortController();
        this.render();
        this.loadWeather();
      }
    }
  
    setState(state) {
      this.setAttribute("state", state);
    }
  
    render() {
      const template = document.querySelector("#weather-card-template");
      const clone = template.content.cloneNode(true);
  
      this.textContent = "";
      this.append(clone);
  
      this.status = this.querySelector(".weather-card__status");
      this.dataList = this.querySelector(".weather-card__data");
      this.temperature = this.querySelector(".weather-card__temperature");
      this.wind = this.querySelector(".weather-card__wind");
  
      this.setState("idle");
      this.status.textContent = "Weather has not loaded yet.";
    }
  
    async loadWeather() {
      const latitude = this.getAttribute("latitude");
      const longitude = this.getAttribute("longitude");
  
      if (!latitude || !longitude) {
        this.setState("error");
        this.status.textContent = "Weather location is missing.";
        return;
      }
  
      this.setState("loading");
      this.status.textContent = "Loading weather...";
  
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set("current", "temperature_2m,wind_speed_10m");
      url.searchParams.set("temperature_unit", "fahrenheit");
      url.searchParams.set("wind_speed_unit", "mph");
  
      const timeout = setTimeout(() => {
        this.controller.abort();
      }, 8000);
  
      try {
        const response = await fetch(url, {
          signal: this.controller.signal
        });
  
        if (!response.ok) {
          throw new Error("Weather request failed.");
        }
  
        const weather = await response.json();
        const current = weather.current;
  
        this.temperature.textContent = `${current.temperature_2m} °F`;
        this.wind.textContent = `${current.wind_speed_10m} mph`;
        this.dataList.hidden = false;
        this.status.textContent = "Weather loaded.";
        this.setState("ready");
      } catch (error) {
        this.setState("error");
  
        if (error.name === "AbortError") {
          this.status.textContent = "Weather request timed out.";
        } else {
          this.status.textContent = "Weather could not be loaded right now.";
        }
      } finally {
        clearTimeout(timeout);
      }
    }
  }
  
  customElements.define("weather-card", WeatherCard);