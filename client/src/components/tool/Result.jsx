import React, { Component } from "react";

import { Helmet } from "react-helmet";

class Result extends Component {

  render() {
    return (
      <>
        <Helmet></Helmet>
        <section class="content-window">
          <header>
            <div class="content-window-title">Location</div>
            <div class="section-options"></div>
          </header>
          <section>
            <div class="flex-group">
              <div>
                <span class="txt-icon txt-lrg txt-apc txt-line1">
                  <i><img src="assets/icons/flags/ng.svg" /></i>
                  <span>Nigeria</span>
                </span>
                <label>Response</label>
              </div>
              <span>
                <span class="txt-lrg txt-line1 txt-apc">Maiduguri</span>
                <label>Area</label>
              </span>
              <span>
                <span class="txt-xlarge txt-line1 txt-apc">Garmawa</span>
                <label>Fieldsite</label>
              </span>
            </div>
            <i class="content-icon"><img src="assets/icons/location.svg" /></i>
          </section>
          <footer></footer>
        </section>

        <section class="content-window">
          <header>
            <div class="content-window-title">Current water safety status</div>
            <div class="section-options"></div>
          </header>
          <section>
            <div class="stat">
              <div>
                <div class="txt-apc">
                  <span class="value">62</span>
                  <span class="unit txt-lrg">%</span>
                </div>
                <label class="txt-sm">FRC at the Tapstand</label>
              </div>
              <div></div>
              <div>
                <span class="txt-icon txt-sm help">
                  <i><img src="assets/icons/guide.svg" /></i>
                  <span>The percentage of tapstand water samples with an FRC of at least 0.2mg/l - <a href="#">learn more</a>
                  </span>
                </span>
              </div>
            </div>
            <div class="stat">
              <div>
                <div class="txt-apc">
                  <span class="value">32</span>
                  <span class="unit txt-lrg">%</span>
                </div>
                <label class="txt-sm">FRC at the Household</label>
              </div>
              <div></div>
              <div>
                <span class="txt-icon txt-sm help">
                  <i><img src="assets/icons/guide.svg" /></i>
                  <span>The percentage of household water samples with an FRC of at least 0.2mg/l - <a href="#">learn more</a>
                  </span>
                </span>
              </div>
            </div>
          </section>
          <footer></footer>
        </section>

        <section class="content-window">
          <header>
            <div class="content-window-title">FRC Target</div>
            <div class="section-options"></div>
          </header>
          <section>
            <div class="stat">
              <div>
                <div class="txt-apc">
                  <span class="value">0.9</span>
                  <span class="unit txt-lrg">mg/l</span>
                </div>
                <label class="txt-sm">FRC at the Tapstand</label>
              </div>
              <div></div>
              <div>
                <span class="txt-icon txt-sm help">
                  <i><img src="assets/icons/guide.svg" /></i>
                  <span>You should aim for this FRC value at the tapstand in order to ensure water is safe to drink after storing in the home. - <a href="#">learn more</a>
                  </span>
                </span>
              </div>
            </div>
          </section>
          <footer></footer>
        </section>

        <section class="content-window">
          <header>
            <div class="content-window-title">Water Safety Improvements</div>
            <div class="section-options"></div>
          </header>
          <section>
            <div class="stat float">
              <div>
                <div class="txt-apc">
                  <span class="value">85</span>
                  <span class="unit txt-lrg">%</span>
                </div>
                <label class="txt-sm">Predicted improvements</label>
              </div>
              <div></div>
              <div class="full">
                <span class="txt-icon txt-sm help">
                  <i><img src="assets/icons/guide.svg" /></i>
                  <span>If the target FRC level was achieved at all tapstands, the SWOT predicts that this percentage of household water samples would show at least 0.2mg/l FRC. - <a href="#">learn more</a>
                  </span>
                </span>
              </div>
            </div>
          </section>
          <footer></footer>
        </section>

        <section class="content-window">
          <header>
            <div class="content-window-title">What's Next?</div>
            <div class="section-options"></div>
          </header>
          <section>
            <ul class="whats-next float txt-center inline">
              <li>
                <figure>
                  <img src="assets/icons/tap-stand.svg" />
                </figure>
                <div>
                  <div class="title txt-500">Increase chlorine dosing</div>
                  <p class="txt-sm">To achieve 0.9mg/l across all tapstands. <a href="#">more info</a></p>
                </div>
              </li>
              <li>
                <figure>
                  <img src="assets/icons/guide-monitor.svg" />
                </figure>
                <div>
                  <div class="title txt-500">Continue monitoring FRC</div>
                  <p class="txt-sm">Once you have collected 100 more paired samples try running another analysis and compare the results. <a href="#">more info</a></p>
                </div>
              </li>
              <li>
                <figure>
                  <img src="assets/icons/guide-full.svg" />
                </figure>
                <div>
                  <div class="title txt-500">Review guidance</div>
                  <p class="txt-sm">For information on improving safe water chain and addressing common problems. <a href="#">more info</a></p>
                </div>
              </li>
            </ul>
          </section>
          <footer></footer>
        </section>
      </>
    );
  }
}

export default Result;
