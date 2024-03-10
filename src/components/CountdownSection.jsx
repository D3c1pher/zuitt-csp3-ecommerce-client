export default function CountdownSection() {
  return (
    <div className="pt-5">
      <div className="divider text-center text-3xl font-bold">
        <h2>STYLESPHERE 2024 COUNTDOWN</h2>
      </div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value":7}}></span>
          </span>
          days
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value":10}}></span>
          </span>
          hours
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value":24}}></span>
          </span>
          min
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value":40}}></span>
          </span>
          sec
        </div>
      </div>
      <div className="divider divider-base-300"></div>
    </div>
  )
}
