const keys = require('../../config/key');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input</h3>
          <p>Please answer our following question</p>
          <p>${survey.body}</p>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/thanks">YES</a>
            </div>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/thanks">NOOOO</a>
            </div>
          </div>
      </body>
    </html>
  `;
};