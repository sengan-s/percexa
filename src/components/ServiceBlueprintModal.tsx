import React, { useState } from 'react';
import { X, Check, Code2, ArrowRight, Layers, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';

interface ServiceBlueprintModalProps {
  serviceId: string | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const ServiceBlueprintModal: React.FC<ServiceBlueprintModalProps> = ({
  serviceId,
  onClose,
  onOpenConsultation,
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'ts' | 'rust'>('ts');

  const blueprints: Record<string, {
    number: string;
    title: string;
    description: string;
    benchmarks: { label: string; value: string }[];
    pipeline: { step: string; detail: string }[];
    tsSnippet: string;
    rustSnippet: string;
    deliverables: string[];
  }> = {
    software: {
      number: '01',
      title: 'SOFTWARE DEVELOPMENT',
      description: 'Ultra-low latency scalable software architectures engineered in compiled Rust, Go, and TypeScript.',
      benchmarks: [
        { label: 'CONCURRENT THROUGHPUT', value: '185,000 req/sec' },
        { label: 'P99 NETWORK LATENCY', value: '< 1.4ms' },
        { label: 'CODE TEST COVERAGE', value: '99.4% Invariants' },
      ],
      pipeline: [
        { step: '01. Domain Modeling', detail: 'Formal algebraic type definitions and boundary constraint validation.' },
        { step: '02. High-Throughput Core', detail: 'Zero-allocation memory models and non-blocking asynchronous event loops.' },
        { step: '03. Stress Verification', detail: 'Chaos engineering and fuzz testing under 500k synthetic concurrent loads.' },
      ],
      tsSnippet: `// Percexa High-Concurrency Stream Pipeline
export class CoreDataPipeline<T extends SystemRecord> {
  private readonly buffer: RingBuffer<T>;
  constructor(capacity = 65536) {
    this.buffer = new RingBuffer(capacity);
  }
  public async ingestBatch(items: AsyncIterable<T>): Promise<IngestReceipt> {
    const batchSpan = telemetry.startSpan("pipeline.batch");
    for await (const record of items) {
      if (!record.isValid()) throw new InvariantError();
      await this.buffer.push(record);
    }
    return { status: "COMMITTED", epoch: Date.now() };
  }
}`,
      rustSnippet: `// Percexa Zero-Allocation Core Engine
pub struct ExecutionMesh<T: StatePayload> {
    ring: Arc<LockFreeRing<T>>,
    metrics: AtomicU64,
}
impl<T: StatePayload> ExecutionMesh<T> {
    pub fn dispatch(&self, event: T) -> Result<EventHash, MeshError> {
        self.ring.try_push(event)
            .map(|hash| { self.metrics.fetch_add(1, Ordering::Relaxed); hash })
            .map_err(|_| MeshError::BufferSaturated)
    }
}`,
      deliverables: [
        'Production-grade microservices codebase in monorepo with strict CI/CD',
        'End-to-end OpenAPI and gRPC Protobuf interface contracts',
        'Comprehensive load testing scripts and Prometheus telemetry dashboards',
      ],
    },
    ai: {
      number: '02',
      title: 'AI SOLUTIONS',
      description: 'Enterprise generative AI architectures, fine-tuned domain models, and autonomous multi-agent systems.',
      benchmarks: [
        { label: 'INFERENCE LATENCY', value: '< 18ms Time-to-First-Token' },
        { label: 'HALLUCINATION SUPPRESSION', value: '99.98% Guardrail Filter' },
        { label: 'CONTEXT RETENTION', value: 'Hierarchical 2M+ Token State' },
      ],
      pipeline: [
        { step: '01. Data Synthesis', detail: 'Curation of domain ground-truth corpora with synthetic augmentation.' },
        { step: '02. Fine-Tuning & Quantization', detail: 'LoRA / QLoRA parameter-efficient training with INT4/INT8 deployment.' },
        { step: '03. Safety Guardrails', detail: 'Deterministic token interceptors verifying semantic outputs in real-time.' },
      ],
      tsSnippet: `// Percexa Multi-Agent Autonomous Orchestrator
export async function coordinateAgentTask(task: EnterpriseMission): Promise<MissionResult> {
  const supervisor = new AgentSupervisor({
    safetyPolicy: StrictZeroTrustPolicy,
    maxIterations: 16,
  });
  const solution = await supervisor.execute({
    context: task.context,
    tools: [vectorRetrievalTool, codeSynthesisTool, schemaValidatorTool],
  });
  return solution.verifyInvariants();
}`,
      rustSnippet: `// Quantized Matrix Multiplication Tensor Kernel
pub fn fused_attention_step(q: &Tensor, k: &Tensor, v: &Tensor) -> Tensor {
    let scale = 1.0 / (q.dim(-1) as f32).sqrt();
    let scores = q.matmul(&k.transpose(-1, -2)) * scale;
    let attention_weights = scores.softmax(-1);
    attention_weights.matmul(v)
}`,
      deliverables: [
        'Private localized LLM deployment behind corporate zero-trust boundaries',
        'Autonomous agent workflow graph with deterministic rollback mechanisms',
        'Continuous evaluation harness benchmarking accuracy and bias drift',
      ],
    },
    design: {
      number: '03',
      title: 'DESIGN',
      description: 'Apple-level minimalist interfaces, spatial 3D web visualizations, and kinetic design systems.',
      benchmarks: [
        { label: 'FRAME RATE', value: 'Locked 60 / 120 FPS' },
        { label: 'INTERACTION LATENCY', value: '< 16ms First Feedback' },
        { label: 'ACCESSIBILITY', value: '100% WCAG AA Certified' },
      ],
      pipeline: [
        { step: '01. Spatial Architecture', detail: 'Defining typographic scales, spatial math, and atmospheric lighting.' },
        { step: '02. 3D WebGL Prototyping', detail: 'Physically-based shader calibration with custom normal maps.' },
        { step: '03. Kinetic Micro-Interactions', detail: 'Cubic bezier spring damping tuned to high-end tactile feedback.' },
      ],
      tsSnippet: `// Kinetic Spring Physics Controller
export function useTactileSpring(targetValue: number, damping = 0.85) {
  const velocity = useRef(0);
  const current = useRef(targetValue);
  useFrame((_, delta) => {
    const force = (targetValue - current.current) * 120;
    velocity.current = (velocity.current + force * delta) * damping;
    current.current += velocity.current * delta;
  });
  return current.current;
}`,
      rustSnippet: `// WebAssembly Fast Vector Mesh Transformer
#[wasm_bindgen]
pub fn transform_mesh_vertices(vertices: &mut [f32], factor: f32) {
    for chunk in vertices.chunks_mut(3) {
        chunk[1] += (chunk[0] * factor).sin() * 0.05;
    }
}`,
      deliverables: [
        'Complete Figma design system with tokens, states, and responsive grids',
        'Production React + Three.js components ready for deployment',
        'Design guidelines documentation covering brand, typography, and sound',
      ],
    },
    cloud: {
      number: '04',
      title: 'CLOUD & DEVOPS',
      description: 'Fault-tolerant multi-region Kubernetes clusters, automated GitOps CI/CD pipelines, and zero-downtime deployments.',
      benchmarks: [
        { label: 'SERVICE AVAILABILITY', value: '99.999% SLA' },
        { label: 'DEPLOYMENT FREQUENCY', value: '100+ Automated/Day' },
        { label: 'FAILOVER TIME', value: '< 3.2s Global Anycast' },
      ],
      pipeline: [
        { step: '01. Terraform Infrastructure', detail: 'Declarative immutable cloud environments with strict drift detection.' },
        { step: '02. Kubernetes Orchestration', detail: 'Zero-trust service mesh with automated horizontal pod autoscaling.' },
        { step: '03. Telemetry & SRE', detail: 'Distributed OpenTelemetry tracing with proactive anomaly alerting.' },
      ],
      tsSnippet: `// Cloud Native Health & Graceful Drain
app.get("/health/readiness", async (req, res) => {
  const isHealthy = await Promise.all([
    dbPool.ping(),
    redisCluster.ping(),
    eventBus.isAvailable(),
  ]);
  return isHealthy.every(Boolean) 
    ? res.status(200).json({ status: "READY" })
    : res.status(503).json({ status: "DEGRADED" });
});`,
      rustSnippet: `// Anycast Network Health Probe
pub async fn check_upstream_health(endpoint: &str) -> HealthStatus {
    let client = Client::builder().timeout(Duration::from_millis(400)).build().unwrap();
    match client.get(endpoint).send().await {
        Ok(resp) if resp.status().is_success() => HealthStatus::Healthy,
        _ => HealthStatus::Unhealthy,
    }
}`,
      deliverables: [
        'Terraform / OpenTofu infrastructure-as-code repository',
        'ArgoCD GitOps pipeline configuration with automated canary rollouts',
        'Datadog / Grafana observability dashboards with SRE runbooks',
      ],
    },
    consulting: {
      number: '05',
      title: 'CONSULTING',
      description: 'Strategic technical due diligence, AI transformation roadmaps, and high-stakes architecture reviews.',
      benchmarks: [
        { label: 'ROI ACCELERATION', value: '4.8x Efficiency Gain' },
        { label: 'TECHNICAL DEBT AUDIT', value: '100% Invariant Mapping' },
        { label: 'EXECUTIVE ADVISORY', value: 'Direct Partner-Level' },
      ],
      pipeline: [
        { step: '01. Architecture Audit', detail: 'Comprehensive review of bottlenecks, security perimeters, and costs.' },
        { step: '02. Target State Blueprint', detail: 'Designing modular 3-year technology architecture and migration paths.' },
        { step: '03. Executive Hands-On', detail: 'Pairing with internal leads to prototype and deploy core differentiators.' },
      ],
      tsSnippet: `// Architecture Due Diligence Metric Aggregator
export function computeSystemFragilityScore(metrics: SystemAuditData): AuditReport {
  const singlePointsOfFailure = metrics.components.filter(c => c.redundancy === 0);
  const technicalDebtRatio = metrics.legacyLoc / metrics.totalLoc;
  return {
    riskTier: singlePointsOfFailure.length > 0 ? "HIGH" : "RESILIENT",
    debtIndex: technicalDebtRatio,
    recommendedRefactorHorizonMonths: 3,
  };
}`,
      rustSnippet: `// Static Dependency Graph Cyclomatic Analyzer
pub fn detect_cyclic_coupling(graph: &DependencyGraph) -> Vec<DependencyCycle> {
    let mut detector = TarjanScc::new(graph);
    detector.find_strongly_connected_components()
}`,
      deliverables: [
        'Executive Architecture Blueprint & Technical Due Diligence Report',
        'Actionable 12-month engineering roadmap with risk mitigation matrix',
        'Hands-on prototype codebase validating core technical assumptions',
      ],
    },
  };

  const current = blueprints[serviceId || 'software'] || blueprints.software;

  if (!serviceId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#080808] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl flex flex-col my-6 font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 bg-[#040404] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-1">
              <span>DISCIPLINE {current.number}</span>
              <span>·</span>
              <span className="text-white font-medium">SPECIFICATION BLUEPRINT</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {current.title}
            </h3>
            <p className="text-sm text-neutral-400 font-sans mt-1 max-w-xl">
              {current.description}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[75vh]">
          {/* Key SLA & Benchmark metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {current.benchmarks.map((b, i) => (
              <div key={i} className="p-4 rounded border border-neutral-800 bg-neutral-950/60">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  {b.label}
                </span>
                <span className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {b.value}
                </span>
              </div>
            ))}
          </div>

          {/* Architecture Pipeline */}
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
              EXECUTION PIPELINE & METHODOLOGY
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {current.pipeline.map((p, idx) => (
                <div key={idx} className="p-4 rounded border border-neutral-900 bg-[#090909]">
                  <span className="font-mono text-xs text-white font-semibold block mb-1.5">
                    {p.step}
                  </span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Implementation Blueprint */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                CORE ARCHITECTURE CODE IMPLEMENTATION
              </span>

              <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded border border-neutral-800 text-[10px] font-mono">
                <button
                  onClick={() => setActiveCodeTab('ts')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeCodeTab === 'ts' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setActiveCodeTab('rust')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    activeCodeTab === 'rust' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Rust
                </button>
              </div>
            </div>

            <div className="p-4 rounded border border-neutral-800 bg-[#040404] font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
              <pre>{activeCodeTab === 'ts' ? current.tsSnippet : current.rustSnippet}</pre>
            </div>
          </div>

          {/* Key Deliverables */}
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
              COMMITTED PRODUCTION DELIVERABLES
            </span>
            <div className="space-y-2">
              {current.deliverables.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded border border-neutral-900 bg-neutral-950/40 text-xs text-neutral-300 font-sans"
                >
                  <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-neutral-800 bg-[#040404] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-neutral-400 font-sans">
            Ready to scope this architecture with Percexa's senior engineering partners?
          </span>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Consult AI Architect on this Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
