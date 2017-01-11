import * as React from "react";
import "./KnowledgeViewer.less";
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";

export default class KnowledgeViewer extends React.Component<any, any> {
  render() {
    const { knowledge, closeModal } = this.props
    const { analysis, means, keynote, voice } = knowledge

    return (
      <div className="knowledge-page">
        <div className="container has-footer">
          <div className="warm-up-intro">
            <div className="page-header">{knowledge.knowledge}</div>
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-title-img">
                <AssetImg width={48} height={18} type="analysis"/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: analysis}}>
              </div>
              <div className="context-title-img">
                <AssetImg width={50} height={16} type="means"/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: means}}>
              </div>
              <div className="context-title-img">
                <AssetImg width={50} height={18} type="keynotes"/>
              </div>
              <div className="context" dangerouslySetInnerHTML={{__html: keynote}}>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={closeModal}>关闭</div>
      </div>
    )
  }
}