$files = @(
    "c:\Users\daksh\OneDrive\Desktop\BVA\WEb\Bharat-Vision-Website\products\slotted-rubber-stopper-sorting-machine.html",
    "c:\Users\daksh\OneDrive\Desktop\BVA\WEb\Bharat-Vision-Website\products\rubber-disc-sorting-machine.html",
    "c:\Users\daksh\OneDrive\Desktop\BVA\WEb\Bharat-Vision-Website\products\empty-glass-vial-sorting-machine.html",
    "c:\Users\daksh\OneDrive\Desktop\BVA\WEb\Bharat-Vision-Website\products\logo-sorting-machine.html"
)

$oldText = @"
                    <li><a href="../inspect-products.html">We Inspect</a></li>
"@

$newText = @"
                    <li class="dropdown">
                        <a href="../inspect-products.html">We Inspect <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="../pharmaceutical.html">Pharmaceutical</a></li>
                            <li><a href="../cosmetics.html">Cosmetics</a></li>
                        </ul>
                    </li>
"@

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace [regex]::Escape($oldText), $newText
        Set-Content $file -Value $content -NoNewline
        Write-Host "Updated: $file"
    }
}
