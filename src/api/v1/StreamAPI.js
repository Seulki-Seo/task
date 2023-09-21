import axios from "axios";
import queryString from "query-string";

export default class StreamAPI {
  static v1 = "/stream";
  /**
   * Stream API
   */

  /**
   * 모델 데이터를 가져온다
   * @param {string} prediction
   * @param {BoxType} bbox
   * @param {Date} date
   * @param {string} time
   * @param {string} model
   * @param {number} line_num
   *
   * @typedef BoxType
   * @property {number} left
   * @property {number} top
   * @property {number} width
   * @property {number} height
   * @returns {AxiosPromise<any>}
   */
  static getModelData({ prediction, bbox, date, time, model, line_num }) {
    return axios.get(
      `${this.v1}/infer?${queryString.stringify({
        prediction,
        bbox,
        date,
        time,
        model,
        line_num,
      })}`
    );
  }
}
